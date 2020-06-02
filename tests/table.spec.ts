import { buildTests } from './test_helpers';
import {
  BaseTypes,
  SubTypes,
  Text,
  Strong,
  Strikethrough,
  Emphasis,
} from '../src/ast';

buildTests('Table', [
  {
    input: `
| Tables        |      Are      |   Cool |
|:--------------|:-------------:|-------:|
| *col 3 is*    | right-aligned |  $1600 |
| col 2 is      | **centered**  |    $12 |
| zebra stripes |   are neat    | ~~$1~~ |
`,
    expectation: [
      {
        type: BaseTypes.table,
        head: {
          columns: [
            {
              parts: [
                {
                  type: SubTypes.text,
                  value: 'Tables'
                } as Text
              ],
              align: 'left' as const
            },
            {
              parts: [
                {
                  type: SubTypes.text,
                  value: 'Are'
                } as Text
              ],
              align: 'center' as const
            },
            {
              parts: [
                {
                  type: SubTypes.text,
                  value: 'Cool'
                } as Text
              ],
              align: 'right' as const
            }
          ]
        },
        body: [
          {
            columns: [
              {
                parts: [
                  {
                    type: SubTypes.emphasis,
                    parts: [
                      {
                        type: SubTypes.text,
                        value: 'col 3 is'
                      } as Text
                    ]
                  } as Emphasis
                ],
                align: 'left' as const
              },
              {
                parts: [
                  {
                    type: SubTypes.text,
                    value: 'right-aligned'
                  } as Text
                ],
                align: 'center' as const
              },
              {
                parts: [
                  {
                    type: SubTypes.text,
                    value: '$1600'
                  } as Text
                ],
                align: 'right' as const
              }
            ]
          },
          {
            columns: [
              {
                parts: [
                  {
                    type: SubTypes.text,
                    value: 'col 2 is'
                  } as Text
                ],
                align: 'left' as const
              },
              {
                parts: [
                  {
                    type: SubTypes.text,
                    value: ''
                  } as Text,
                  {
                    type: SubTypes.strong,
                    parts: [
                      {
                        type: SubTypes.text,
                        value: 'centered'
                      } as Text
                    ]
                  } as Strong,
                  {
                    type: SubTypes.text,
                    value: ''
                  } as Text
                ],
                align: 'center' as const
              },
              {
                parts: [
                  {
                    type: SubTypes.text,
                    value: '$12'
                  } as Text
                ],
                align: 'right' as const
              }
            ]
          },
          {
            columns: [
              {
                parts: [
                  {
                    type: SubTypes.text,
                    value: 'zebra stripes'
                  } as Text
                ],
                align: 'left' as const
              },
              {
                parts: [
                  {
                    type: SubTypes.text,
                    value: 'are neat'
                  } as Text
                ],
                align: 'center' as const
              },
              {
                parts: [
                  {
                    type: SubTypes.strikethrough,
                    parts: [
                      {
                        type: SubTypes.text,
                        value: '$1'
                      } as Text
                    ]
                  } as Strikethrough
                ],
                align: 'right' as const
              }
            ]
          }
        ]
      }
    ]
  }
]);
