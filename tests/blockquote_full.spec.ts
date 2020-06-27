import { buildTests } from './test_helpers';
import {
  BaseTypes,
  SubTypes
} from '../src/ast';

buildTests('Blockquote', [
  {
    input: `
> # **BIG HEADING**
>
> \`basenodes\` can be nested under blockquotes. This includes:
>
> 1. Lists
> 2. Paragraphs
> 3. Headings
> 4. Horizontal Rows
> 5. Fences
> 6. Tables
> 7. Other Blockquotes (but the actual nesting isn't perfect)
>
> ---
>
> \`\`\`JavaScript
> const a = "string"
> \`\`\`
> > Sub quote
> > > Double sub
> > extra
>
> | x | y |
> |---|---|
> | w | z |
> 
    `,
    expectation: [
      {
        type: BaseTypes.blockquote,
        parts: [
          {
            type: BaseTypes.heading,
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
                    value: 'BIG HEADING'
                  }
                ]
              },
              {
                type: SubTypes.text,
                value: ''
              }
            ],
            size: 1
          },
          {
            type: BaseTypes.paragraph,
            parts: [
              {
                type: SubTypes.codeInline,
                value: 'basenodes'
              },
              {
                type: SubTypes.text,
                value: ' can be nested under blockquotes. This includes:'
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
                      value: 'Lists'
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
                      value: 'Paragraphs'
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
                      value: 'Headings'
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
                      value: 'Horizontal Rows'
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
                      value: 'Fences'
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
                      value: 'Tables'
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
                      value: 'Other Blockquotes (but the actual nesting isn\'t perfect)'
                    }
                  ]
                }
              ]
            ]
          },
          {
            type: BaseTypes.horizontalRow
          },
          {
            type: BaseTypes.fence,
            value: 'const a = "string"\n',
            lang: 'JavaScript'
          },
          {
            type: BaseTypes.blockquote,
            parts: [
              {
                type: BaseTypes.paragraph,
                parts: [
                  {
                    type: SubTypes.text,
                    value: 'Sub quote'
                  }
                ]
              },
              {
                type: BaseTypes.blockquote,
                parts: [
                  {
                    type: BaseTypes.paragraph,
                    parts: [
                      {
                        type: SubTypes.text,
                        value: 'Double sub'
                      },
                      {
                        type: SubTypes.softbreak
                      },
                      {
                        type: SubTypes.text,
                        value: 'extra'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: BaseTypes.table,
            head: {
              columns: [
                {
                  parts: [
                    {
                      type: SubTypes.text,
                      value: 'x'
                    }
                  ],
                  align: 'left'
                },
                {
                  parts: [
                    {
                      type: SubTypes.text,
                      value: 'y'
                    }
                  ],
                  align: 'left'
                }
              ]
            },
            body: [
              {
                columns: [
                  {
                    parts: [
                      {
                        type: SubTypes.text,
                        value: 'w'
                      }
                    ],
                    align: 'left'
                  },
                  {
                    parts: [
                      {
                        type: SubTypes.text,
                        value: 'z'
                      }
                    ],
                    align: 'left'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]);
