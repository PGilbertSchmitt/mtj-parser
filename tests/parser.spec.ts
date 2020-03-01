import test from 'ava';
import markdownLexer from 'markdown-it';
import BaseParser from '../src/base_parser';
import { Token } from '../src/token';

import HeadingRubric from './heading.rubric';
import HorizontalRowRubric from './horizontal_row.rubric';
import ParagraphRubric from './paragraph.rubric';
import FenceRubric from './fence.rubric';

const lexer = markdownLexer();

const sections = [
  {
    section: 'heading',
    rubric: HeadingRubric
  },
  {
    section: 'horizontal row',
    rubric: HorizontalRowRubric
  },
  {
    section: 'paragraph',
    rubric: ParagraphRubric
  },
  {
    section: 'fence',
    rubric: FenceRubric
  }
];

sections.forEach(({ section, rubric }) => {
  console.log(section);
  rubric.forEach(({ input, expectation }, i) => {
    test(`Parse ${section} (${i})`, t => {
      const tokens = lexer.parse(input, {}) as Token[];
      const parser = new BaseParser(tokens);
      const actual = parser.parse();

      t.deepEqual(actual, expectation);
    });
  });
});
