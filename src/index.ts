import markdownIt from 'markdown-it';
import { Token } from './token';
import BaseParser from './base_parser';

// I'm treating it more as a lexer, as I'll do the more intricate parsing while building the AST.
const lexer = markdownIt();
const envir = {};
export const parseMarkdown = (content: string) => {
  const tokens = lexer.parse(content, envir) as Token[];
  const length = tokens.length;
  if (length < 2) {
    throw new Error('Something\'s probably gone wrong');
  }
  const parser = new BaseParser(tokens);

  return parser.parse();
};

export { BaseNode } from './ast';
export { BaseTypes } from './ast';
export { Blockquote } from './ast';
export { BulletList } from './ast';
export { CodeInline } from './ast';
export { Emphasis } from './ast';
export { Fence } from './ast';
export { HardBreak } from './ast';
export { Cell } from './ast';
export { Heading } from './ast';
export { HorizontalRow } from './ast';
export { Image } from './ast';
export { InlineSection } from './ast';
export { Link } from './ast';
export { ListItem } from './ast';
export { MarkdownDoc } from './ast';
export { OrderedList } from './ast';
export { Paragraph } from './ast';
export { Row } from './ast';
export { SoftBreak } from './ast';
export { Strikethrough } from './ast';
export { Strong } from './ast';
export { SubNode } from './ast';
export { SubTypes } from './ast';
export { Table } from './ast';
export { Text } from './ast';
export { alignment } from './ast';
