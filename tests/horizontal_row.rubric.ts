import {
  BaseTypes
} from '../src/ast';
import { TestPair } from './test_helpers';

export default [
  {
    input: '---',
    expectation: [ { type: BaseTypes.horizontalRow } ]
  },
  {
    input: '***',
    expectation: [ { type: BaseTypes.horizontalRow } ]
  },
  {
    input: '___',
    expectation: [ { type: BaseTypes.horizontalRow } ]
  }
] as TestPair[];
