import { buildTests } from './test_helpers';import {
  BaseTypes
} from '../src/ast';

buildTests('Horizontal Row', [
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
]);
