import { buildTests } from './test_helpers';import {
  BaseTypes,
  SubTypes
} from '../src/ast';

buildTests('Heading', [
  {
    input: '# This is an h1 header',
    expectation: [ {
      type: BaseTypes.heading,
      parts: [ { type: SubTypes.text, value: 'This is an h1 header' } ],
      size: 1
    } ]
  },
  {
    input: '## This is an h2 header',
    expectation: [ {
      type: BaseTypes.heading,
      parts: [ { type: SubTypes.text, value: 'This is an h2 header' } ],
      size: 2
    } ]
  },
  {
    input: '### This is an h3 header',
    expectation: [ {
      type: BaseTypes.heading,
      parts: [ { type: SubTypes.text, value: 'This is an h3 header' } ],
      size: 3
    } ]
  },
  {
    input: '#### This is an h4 header',
    expectation: [ {
      type: BaseTypes.heading,
      parts: [ { type: SubTypes.text, value: 'This is an h4 header' } ],
      size: 4
    } ]
  },
  {
    input: '##### This is an h5 header',
    expectation: [ {
      type: BaseTypes.heading,
      parts: [ { type: SubTypes.text, value: 'This is an h5 header' } ],
      size: 5
    } ]
  },
  {
    input: '###### This is an h6 header',
    expectation: [ {
      type: BaseTypes.heading,
      parts: [ { type: SubTypes.text, value: 'This is an h6 header' } ],
      size: 6
    } ]
  },
]);
