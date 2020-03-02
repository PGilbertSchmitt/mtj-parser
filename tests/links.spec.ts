import { buildTests } from './test_helpers';import {
  BaseTypes,
  SubTypes
} from '../src/ast';

buildTests('Link', [
  {
    input: 'This is an [inline link](www.example.com)',
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.text,
          value: 'This is an '
        },
        {
          type: SubTypes.link,
          parts: [
            {
              type: SubTypes.text,
              value: 'inline link'
            }
          ],
          dest: 'www.example.com'
        }
      ]
    } ]
  },
  {
    input: 'This is an [inline link](www.example.com "With a title")',
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.text,
          value: 'This is an '
        },
        {
          type: SubTypes.link,
          parts: [
            {
              type: SubTypes.text,
              value: 'inline link'
            }
          ],
          dest: 'www.example.com',
          title: 'With a title'
        }
      ]
    } ]
  },
  {
    input: 'This is a [reference link][reference text]\n\n[reference text]: www.example.com',
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.text,
          value: 'This is a '
        },
        {
          type: SubTypes.link,
          parts: [
            {
              type: SubTypes.text,
              value: 'reference link'
            }
          ],
          dest: 'www.example.com'
        }
      ]
    } ]
  },
  {
    input: 'This is an [internal reference link](./src/ast.ts)',
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.text,
          value: 'This is an '
        },
        {
          type: SubTypes.link,
          parts: [
            {
              type: SubTypes.text,
              value: 'internal reference link'
            }
          ],
          dest: './src/ast.ts'
        }
      ]
    } ]
  },
  {
    input: 'This is a [reference link] using its own text as a reference\n\n[reference link]: www.example.com',
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.text,
          value: 'This is a '
        },
        {
          type: SubTypes.link,
          parts: [
            {
              type: SubTypes.text,
              value: 'reference link'
            }
          ],
          dest: 'www.example.com'
        },
        {
          type: SubTypes.text,
          value: ' using its own text as a reference'
        }
      ]
    } ]
  },
  {
    input: '![first alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mumbai_Train.JPG/1280px-Mumbai_Train.JPG "First title text")',
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.image,
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mumbai_Train.JPG/1280px-Mumbai_Train.JPG',
          title: 'First title text'
        }
      ]
    } ]
  },
  {
    input: '![second alt text][image reference]\n\n[image reference]: https://upload.wikimedia.org/wikipedia/commons/5/5a/City_of_Rockhampton_train_%28Sunshine_railway_station%2C_Brisbane%29.jpg "Second title text"',
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.image,
          src: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/City_of_Rockhampton_train_%28Sunshine_railway_station%2C_Brisbane%29.jpg',
          title: 'Second title text'
        }
      ]
    } ]
  },
  {
    input: '[This link has a **style** inside it](www.example.com)',
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.link,
          parts: [
            {
              type: SubTypes.text,
              value: 'This link has a '
            },
            {
              type: SubTypes.strong,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'style'
                }
              ]
            },
            {
              type: SubTypes.text,
              value: ' inside it'
            }
          ],
          dest: 'www.example.com'
        }
      ]
    } ]
  },
  {
    input: 'This paragraph has a ~~[**bold link**](www.example.com)~~ with a line through it',
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.text,
          value: 'This paragraph has a '
        },
        {
          type: SubTypes.strikethrough,
          parts: [
            {
              type: SubTypes.link,
              parts: [
                {
                  type: SubTypes.text,
                  value: ''
                },
                {
                  type: SubTypes.strong,
                  parts: [
                    {
                      type: SubTypes.text,
                      value: 'bold link'
                    }
                  ]
                },
                {
                  type: SubTypes.text,
                  value: ''
                }
              ],
              dest: 'www.example.com'
            }
          ]
        },
        {
          type: SubTypes.text,
          value: ' with a line through it'
        }
      ]
    } ]
  }
]);
