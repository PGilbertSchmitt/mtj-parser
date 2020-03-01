import {
  BaseTypes,
  SubTypes
} from '../src/ast';
import { TestPair } from './test_helpers';

export default [
  {
    input: 'This is a paragraph',
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.text,
          value: 'This is a paragraph'
        }
      ]
    } ]
  },
  {
    input: `This is a paragraph
with a softbreak with no spaces`,
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.text,
          value: 'This is a paragraph'
        },
        {
          type: SubTypes.softbreak
        },
        {
          type: SubTypes.text,
          value: 'with a softbreak with no spaces'
        }
      ]
    } ]
  },
  {
    input: `This is a paragraph 
with a softbreak with one space`,
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.text,
          value: 'This is a paragraph'
        },
        {
          type: SubTypes.softbreak
        },
        {
          type: SubTypes.text,
          value: 'with a softbreak with one space'
        }
      ]
    } ]
  },
  {
    input: `This is a paragraph  
with a hardbreak with two spaces`,
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.text,
          value: 'This is a paragraph'
        },
        {
          type: SubTypes.hardbreak
        },
        {
          type: SubTypes.text,
          value: 'with a hardbreak with two spaces'
        }
      ]
    } ]
  },
  {
    input: 'This is a text with an *italic style*, a **bold style**, a ~~strikethrough~~, and `inlined code`.',
    expectation: [ {
      type: BaseTypes.paragraph,
      parts: [
        {
          type: SubTypes.text,
          value: 'This is a text with an '
        },
        {
          type: SubTypes.emphasis,
          parts: [
            {
              type: SubTypes.text,
              value: 'italic style'
            }
          ]
        },
        {
          type: SubTypes.text,
          value: ', a '
        },
        {
          type: SubTypes.strong,
          parts: [
            {
              type: SubTypes.text,
              value: 'bold style'
            }
          ]
        },
        {
          type: SubTypes.text,
          value: ', a '
        },
        {
          type: SubTypes.strikethrough,
          parts: [
            {
              type: SubTypes.text,
              value: 'strikethrough'
            }
          ]
        },
        {
          type: SubTypes.text,
          value: ', and '
        },
        {
          type: SubTypes.codeInline,
          value: 'inlined code'
        },
        {
          type: SubTypes.text,
          value: '.'
        }
      ]
    } ]
  }
] as TestPair[];
