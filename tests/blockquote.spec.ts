import { buildTests } from './test_helpers';
import {
  BaseTypes,
  SubTypes
} from '../src/ast';

buildTests('Blockquote', [
  {
    input: '> This is a block quote with **internal styles**.',
    expectation: [
      {
        type: BaseTypes.blockquote,
        parts: [
          {
            type: BaseTypes.paragraph,
            parts: [
              {
                type: SubTypes.text,
                value: 'This is a block quote with '
              },
              {
                type: SubTypes.strong,
                parts: [
                  {
                    type: SubTypes.text,
                    value: 'internal styles'
                  }
                ]
              },
              {
                type: SubTypes.text,
                value: '.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    input: `
> First line
> Second line
>
> Third line
    `,
    expectation: [
      {
        type: BaseTypes.blockquote,
        parts: [
          {
            type: BaseTypes.paragraph,
            parts: [
              {
                type: SubTypes.text,
                value: 'First line'
              },
              {
                type: SubTypes.softbreak
              },
              {
                type: SubTypes.text,
                value: 'Second line'
              }
            ]
          },
          {
            type: BaseTypes.paragraph,
            parts: [
              {
                type: SubTypes.text,
                value: 'Third line'
              }
            ]
          }
        ]
      }
    ]
  }
]);
