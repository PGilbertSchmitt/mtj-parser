import { buildTests } from './test_helpers';
import {
  BaseTypes
} from '../src/ast';

buildTests('Fence', [
  {
    input: '```\n// This code block has no language\n// That means it\'s generic and unstyled\n```',
    expectation: [ {
      type: BaseTypes.fence,
      value: '// This code block has no language\n// That means it\'s generic and unstyled\n',
      lang: ''
    } ]
  },
  {
    input: '```javascript\nconst x = \'This is a code block\';\nconst y = \'Hello mom!\';\n```',
    expectation: [ {
      type: BaseTypes.fence,
      value: 'const x = \'This is a code block\';\nconst y = \'Hello mom!\';\n',
      lang: 'javascript'
    } ]
  },
  {
    input: `
\`\`\`ruby
# Something more complicated to ensure formatting stays consistent
def fib(places)
  a = 0
  b = 1

  while a < places do
    puts a + "\\n"
    a = b
    b = a + b
  end
end

puts fib(1000)
\`\`\``,
    expectation: [ {
      type: BaseTypes.fence,
      value: `\
# Something more complicated to ensure formatting stays consistent
def fib(places)
  a = 0
  b = 1

  while a < places do
    puts a + "\\n"
    a = b
    b = a + b
  end
end

puts fib(1000)
`,
      lang: 'ruby'
    } ]
  }
]);
