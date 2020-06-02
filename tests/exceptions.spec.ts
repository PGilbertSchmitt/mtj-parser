import test from 'ava';
import SubParser from '../src/sub_parser';
import { TokenType } from '../src/token';

test('Subparsing invalid token should throw', t => {
  const p = new SubParser(
    [
      {
        type: TokenType.paragraph_open,
        tag: 'p',
        attrs: null,
        map: [
          0,
          1
        ],
        nesting: 1,
        level: 0,
        children: null,
        content: '',
        markup: '',
        info: '',
        meta: null,
        block: true,
        hidden: false
      },
      {
        type: 'BAD_TOKEN' as TokenType,
        tag: '',
        attrs: null,
        map: [
          0,
          1
        ],
        nesting: 0,
        level: 1,
        children: [
          {
            type: TokenType.text,
            tag: '',
            attrs: null,
            map: null,
            nesting: 0,
            level: 0,
            children: null,
            content: '',
            markup: '',
            info: '',
            meta: null,
            block: false,
            hidden: false
          },
          {
            type: TokenType.strong_open,
            tag: 'strong',
            attrs: null,
            map: null,
            nesting: 1,
            level: 1,
            children: null,
            content: '',
            markup: '**',
            info: '',
            meta: null,
            block: false,
            hidden: false
          },
          {
            type: TokenType.text,
            tag: '',
            attrs: null,
            map: null,
            nesting: 0,
            level: 1,
            children: null,
            content: 'strong string',
            markup: '',
            info: '',
            meta: null,
            block: false,
            hidden: false
          },
          {
            type: TokenType.strong_close,
            tag: 'strong',
            attrs: null,
            map: null,
            nesting: -1,
            level: 0,
            children: null,
            content: '',
            markup: '**',
            info: '',
            meta: null,
            block: false,
            hidden: false
          },
          {
            type: TokenType.text,
            tag: '',
            attrs: null,
            map: null,
            nesting: 0,
            level: 0,
            children: null,
            content: '',
            markup: '',
            info: '',
            meta: null,
            block: false,
            hidden: false
          }
        ],
        content: '**strong string**',
        markup: '',
        info: '',
        meta: null,
        block: true,
        hidden: false
      },
      {
        type: TokenType.paragraph_close,
        tag: 'p',
        attrs: null,
        map: null,
        nesting: -1,
        level: 0,
        children: null,
        content: '',
        markup: '',
        info: '',
        meta: null,
        block: true,
        hidden: false
      }
    ]
  );
  t.throws(p.parseBlock);
});
