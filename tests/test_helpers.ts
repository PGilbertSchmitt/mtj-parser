import test from 'ava';
import markdownLexer from 'markdown-it';
import { MarkdownDoc } from '../src/ast';
import BaseParser from '../src/base_parser';
import { Token } from '../src/token';

const lexer = markdownLexer();

export interface TestPair {
  input: string,
  expectation: MarkdownDoc
}

export const buildTests = (section: string, rubric: TestPair[]) => {
  rubric.forEach(({ input, expectation }, i) => {
    test(`Parse ${section} (${i})`, t => {
      const tokens = lexer.parse(input, {}) as Token[];
      const parser = new BaseParser(tokens);
      const actual = parser.parse();

      t.deepEqual(actual, expectation);
    });
  });
};
