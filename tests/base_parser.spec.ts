import anyTest, { TestInterface } from 'ava';
import markdownLexer from 'markdown-it';
import BaseParser from '../src/base_parser';
import {
  BaseTypes,
  SubTypes,
  Heading,
  Text
} from '../src/ast';
import { Token } from '../src/token';

const lexer = markdownLexer();
const test = anyTest as TestInterface<{}>;

test('Parses headers', t => {
  const tokens = lexer.parse('# Big header', {}) as Token[];
  const parser = new BaseParser(tokens);
  const output = parser.parse();
  const node = output[0];
  
  t.is(node.type, BaseTypes.heading);
  const heading = node as Heading;
  t.is(heading.size, 1);
  t.is(heading.parts[0].type, SubTypes.text);
  t.is((heading.parts[0] as Text).value, 'Big header');
});
