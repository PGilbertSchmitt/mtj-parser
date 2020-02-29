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
