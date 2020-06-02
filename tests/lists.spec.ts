import { buildTests } from './test_helpers';
import {
  BaseTypes,
  SubTypes
} from '../src/ast';

buildTests('List', [
  {
    input: `
1. First item 
   With more

2. Second item

   And then some

3. Third item
`,
    expectation: [
      {
        type: BaseTypes.orderedList,
        list: [
          [
            {
              type: BaseTypes.paragraph,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'First item'
                },
                {
                  type: SubTypes.softbreak
                },
                {
                  type: SubTypes.text,
                  value: 'With more'
                }
              ]
            }
          ],
          [
            {
              type: BaseTypes.paragraph,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'Second item'
                }
              ]
            },
            {
              type: BaseTypes.paragraph,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'And then some'
                }
              ]
            }
          ],
          [
            {
              type: BaseTypes.paragraph,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'Third item'
                }
              ]
            }
          ]
        ]
      }
    ]
  },
  {
    input: `
* An item
* Another item
* Yet another item
`,
    expectation: [
      {
        type: BaseTypes.bulletList,
        list: [
          [
            {
              type: BaseTypes.paragraph,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'An item'
                }
              ]
            }
          ],
          [
            {
              type: BaseTypes.paragraph,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'Another item'
                }
              ]
            }
          ],
          [
            {
              type: BaseTypes.paragraph,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'Yet another item'
                }
              ]
            }
          ]
        ]
      }
    ]
  },
  {
    input: `
+ A list
  + That is
    + Nested
  + Which
  + Is
+ Interesting
`,
    expectation: [
      {
        type: BaseTypes.bulletList,
        list: [
          [
            {
              type: BaseTypes.paragraph,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'A list'
                }
              ]
            },
            {
              type: BaseTypes.bulletList,
              list: [
                [
                  {
                    type: BaseTypes.paragraph,
                    parts: [
                      {
                        type: SubTypes.text,
                        value: 'That is'
                      }
                    ]
                  },
                  {
                    type: BaseTypes.bulletList,
                    list: [
                      [
                        {
                          type: BaseTypes.paragraph,
                          parts: [
                            {
                              type: SubTypes.text,
                              value: 'Nested'
                            }
                          ]
                        }
                      ]
                    ]
                  }
                ],
                [
                  {
                    type: BaseTypes.paragraph,
                    parts: [
                      {
                        type: SubTypes.text,
                        value: 'Which'
                      }
                    ]
                  }
                ],
                [
                  {
                    type: BaseTypes.paragraph,
                    parts: [
                      {
                        type: SubTypes.text,
                        value: 'Is'
                      }
                    ]
                  }
                ]
              ]
            }
          ],
          [
            {
              type: BaseTypes.paragraph,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'Interesting'
                }
              ]
            }
          ]
        ]
      }
    ]
  },
  {
    input: `
1. You can
   + even
      1. nest
      2. with
   + mixed
   + list
2. types
`,
    expectation: [
      {
        type: BaseTypes.orderedList,
        list: [
          [
            {
              type: BaseTypes.paragraph,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'You can'
                }
              ]
            },
            {
              type: BaseTypes.bulletList,
              list: [
                [
                  {
                    type: BaseTypes.paragraph,
                    parts: [
                      {
                        type: SubTypes.text,
                        value: 'even'
                      }
                    ]
                  },
                  {
                    type: BaseTypes.orderedList,
                    list: [
                      [
                        {
                          type: BaseTypes.paragraph,
                          parts: [
                            {
                              type: SubTypes.text,
                              value: 'nest'
                            }
                          ]
                        }
                      ],
                      [
                        {
                          type: BaseTypes.paragraph,
                          parts: [
                            {
                              type: SubTypes.text,
                              value: 'with'
                            }
                          ]
                        }
                      ]
                    ]
                  }
                ],
                [
                  {
                    type: BaseTypes.paragraph,
                    parts: [
                      {
                        type: SubTypes.text,
                        value: 'mixed'
                      }
                    ]
                  }
                ],
                [
                  {
                    type: BaseTypes.paragraph,
                    parts: [
                      {
                        type: SubTypes.text,
                        value: 'list'
                      }
                    ]
                  }
                ]
              ]
            }
          ],
          [
            {
              type: BaseTypes.paragraph,
              parts: [
                {
                  type: SubTypes.text,
                  value: 'types'
                }
              ]
            }
          ]
        ]
      }
    ]
  }
]);
