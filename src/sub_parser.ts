import Parser, { SNP } from './parser';
import { Token, TokenType as TT, TokenType } from './token';
import {
  SubTypes,

  InlineSection,

  Text,
  HardBreak,
  SoftBreak,
  Link,
  Emphasis,
  Strong,
  Strikethrough,
  Image,
  CodeInline,
} from './ast';

const getAttr = (token: Token, attrName: string) => {
  const attrArray = token.attrs.find(attr => attr[0] === attrName) as string[];
  return (attrArray || [])[1];
};

export default class SubParser extends Parser {
  constructor(tokens: Token[]) {
    super(tokens);
  }

  private parseText: SNP = (): Text => {
    const { content } = this.curToken();
    this.step();
    return {
      type: SubTypes.text,
      value: content,
    };
  }

  private parseCodeInline: SNP = (): CodeInline => {
    const { content } = this.curToken();
    this.step();
    return {
      type: SubTypes.codeInline,
      value: content,
    };
  }

  private parseHardbreak: SNP = (): HardBreak => {
    this.step();
    return {
      type: SubTypes.hardbreak,
    };
  }

  private parseSoftBreak: SNP = (): SoftBreak => {
    this.step();
    return {
      type: SubTypes.softbreak,
    };
  }

  private parseEmphasis: SNP = (): Emphasis => {
    this.step();
    return {
      type: SubTypes.emphasis,
      parts: this.parseSection(TT.em_close),
    };
  }

  private parseStrong: SNP = (): Strong => {
    this.step();
    return {
      type: SubTypes.strong,
      parts: this.parseSection(TT.strong_close),
    };
  }

  private parseStrikethrough: SNP = (): Strikethrough => {
    this.step();
    return {
      type: SubTypes.strikethrough,
      parts: this.parseSection(TT.s_close),
    };
  }

  private parseImage: SNP = (): Image => {
    const imageToken = this.curToken();
    this.step();

    if (!imageToken.attrs) {
      this.error(`Image doesn't have attrs\n=> ${JSON.stringify(imageToken)}`);
    }

    const src = getAttr(imageToken, 'src');
    const title = getAttr(imageToken, 'title');
    const alt = getAttr(imageToken, 'alt');

    const image: Image = {
      type: SubTypes.image,
      src,
    };

    if (!!title) { image.title = title; }
    if (!!alt) { image.alt = alt; }

    return image;
  }

  private parseLink: SNP = (): Link => {
    const linkToken = this.curToken();
    this.step();

    if (!linkToken.attrs) {
      this.error(`Link doesn't have attrs\n=> ${JSON.stringify(linkToken)}`);
    }

    const href = getAttr(linkToken, 'href');
    const title = getAttr(linkToken, 'title');
    const parts = this.parseSection(TT.link_close);

    const link: Link = {
      type: SubTypes.link,
      parts,
      dest: href,
    };

    if (!!title) {
      link.title = title;
    }

    return link;
  }

  private getSubNodeParser = (tokenType: TT): SNP => {
    switch (tokenType) {
      case TT.text:
        return this.parseText;
      case TT.code_inline:
        return this.parseCodeInline;
      case TT.hardbreak:
        return this.parseHardbreak;
      case TT.softbreak:
        return this.parseSoftBreak;
      case TT.link_open:
        return this.parseLink;
      case TT.em_open:
        return this.parseEmphasis;
      case TT.strong_open:
        return this.parseStrong;
      case TT.s_open:
        return this.parseStrikethrough;
      case TT.image:
        return this.parseImage;
      default:
        throw new Error(`No such parser for tokenType ${tokenType}`);
    }
  }

  private parseSection = (endToken: TokenType): InlineSection => {
    const parts: InlineSection = [];

    while (this.curToken().type !== endToken) {
      const curType = this.curToken().type;
      parts.push(this.getSubNodeParser(curType)());
    }
    this.step();
    return parts;
  }

  parseBlock = (): InlineSection => {
    const inlineSection: InlineSection = [];
    while (this.stillParsing()) {
      const curType = this.curToken().type;
      inlineSection.push(this.getSubNodeParser(curType)());
    }

    return inlineSection;
  }
}
