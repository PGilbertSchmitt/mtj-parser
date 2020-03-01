import {
  MarkdownDoc,
} from '../src/ast';

export interface TestPair {
  input: string,
  expectation: MarkdownDoc
}
