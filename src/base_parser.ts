import Parser, { BNP } from './parser';
import SubParser from './sub_parser';
import { Token, TokenType as TT } from './token';
import {
  BaseTypes,

  InlineSection,

  MarkdownDoc,
  Paragraph,
  Heading,
  HorizontalRow,
  Fence,
  BulletList,
  OrderedList,
  Table,
  Blockquote,

  ListItem,
  Row,
  Cell,
  alignment,
} from './ast';

type oneToSix = 1 | 2 | 3 | 4 | 5 | 6;

export default class BaseParser extends Parser {
  doc: MarkdownDoc;

  constructor(tokens: Token[]) {
    super(tokens);
  }

  private parseInlineToken = (): InlineSection => {
    const inlineToken = this.curToken();
    if (inlineToken.type !== TT.inline || !inlineToken.children) {
      this.error(`Expected inline token, got ${JSON.stringify(inlineToken)}`);
    }

    // Call to error should prevent children from being null
    const childTokens = this.curToken().children as Token[];
    const parts = new SubParser(childTokens).parseBlock();

    this.step();
    this.step();
    return parts;
  }

  private parseHorizontalRow: BNP = (): HorizontalRow => {
    this.step();
    return {
      type: BaseTypes.horizontalRow,
    };
  }

  private parseParagraph = (): Paragraph => {
    this.step();
    return {
      type: BaseTypes.paragraph,
      parts: this.parseInlineToken(),
    };
  }

  private parseHeading: BNP = (): Heading => {
    // I'm trusting the markup to always be a string of hash signs
    const size = this.curToken().markup.length as oneToSix;
    this.step();
    return {
      type: BaseTypes.heading,
      parts: this.parseInlineToken(),
      size,
    };
  }

  private parseFence: BNP = (): Fence => {
    const { content, info } = this.curToken();
    this.step();
    return {
      type: BaseTypes.fence,
      value: content,
      lang: info,
    };
  }

  private parseListItems = (
    endToken: TT.ordered_list_close | TT.bullet_list_close
  ): ListItem[] => {
    const items: ListItem[] = [];
    while (this.curToken().type === TT.list_item_open) {
      const item = this.parseListItem();
      items.push(item);
    }

    if (this.curToken().type !== endToken) {
      this.error(`Expected to find ${endToken}, got ${JSON.stringify(this.curToken())}`);
    }

    this.step();
    return items;
  }

  private parseListItem = (): ListItem => {
    this.step();

    const parts: ListItem = [];
    while (this.curToken().type !== TT.list_item_close) {
      switch (this.curToken().type) {
        case TT.paragraph_open:
          parts.push(this.parseParagraph());
          break;
        case TT.bullet_list_open:
          parts.push(this.parseBulletList());
          break;
        case TT.ordered_list_open:
          parts.push(this.parseOrderedList());
          break;
      }
    }

    if (this.curToken().type !== TT.list_item_close) {
      this.error(`Expected to find list item close, got ${JSON.stringify(this.curToken())}`);
    }
    this.step();

    return parts;
  }

  private parseBulletList = (): BulletList => {
    this.step();
    const items = this.parseListItems(TT.bullet_list_close);
    return {
      type: BaseTypes.bulletList,
      list: items,
    };
  }

  private parseOrderedList = (): OrderedList => {
    this.step();
    const items = this.parseListItems(TT.ordered_list_close);
    return {
      type: BaseTypes.orderedList,
      list: items,
    };
  }

  private parseTable = (): Table => {
    this.step();

    this.expect(TT.thead_open);
    this.step();
    const head = this.parseRow(TT.th_open);

    this.step();
    this.expect(TT.tbody_open);
    this.step();

    const body: Row[] = [];
    while (this.curToken().type === TT.tr_open) {
      const row = this.parseRow(TT.td_open);
      body.push(row);
    }
    this.expect(TT.tbody_close);
    this.step();
    this.step();

    return {
      type: BaseTypes.table,
      head,
      body,
    };
  }

  private parseRow = (cellToken: TT): Row => {
    this.step();
    const cells: Cell[] = [];

    while (this.curToken().type === cellToken) {
      const cell = this.parseCell();
      cells.push(cell);
    }

    this.step();

    return {
      columns: cells,
    };
  }

  private parseCell = (): Cell => {
    const attrs = this.curToken().attrs;
    let align: alignment;
    try {
      // A lot of trust in this next line
      align = (attrs[0][1].split(':')[1] as alignment) || 'left';
    } catch {
      align = 'left';
    }

    this.step();

    const cellParts = this.parseInlineToken();

    return {
      parts: cellParts,
      align,
    };
  }

  private parseBlockquote = (): Blockquote => {
    this.step();
    this.expect(TT.paragraph_open);
    this.step();
    const quote: Blockquote = {
      type: BaseTypes.blockquote,
      parts: this.parseInlineToken(),
    };
    this.step();
    return quote;
  }

  private getBaseNodeParser = (tokenType: TT): BNP => {
    switch (tokenType) {
      case TT.paragraph_open:
        return this.parseParagraph;
      case TT.heading_open:
        return this.parseHeading;
      case TT.hr:
        return this.parseHorizontalRow;
      case TT.bullet_list_open:
        return this.parseBulletList;
      case TT.ordered_list_open:
        return this.parseOrderedList;
      case TT.fence:
        return this.parseFence;
      case TT.table_open:
        return this.parseTable;
      case TT.blockquote_open:
        return this.parseBlockquote;
      default:
        throw new Error(`No such parser for tokenType ${tokenType}`);
    }
  }

  parse = (): MarkdownDoc => {
    if (this.doc) {
      return this.doc;
    }

    this.doc = [];

    while (this.stillParsing()) {
      const curType = this.curToken().type;
      this.doc.push(this.getBaseNodeParser(curType)());
    }

    return this.doc;
  }
}
