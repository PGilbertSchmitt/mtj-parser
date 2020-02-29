export enum BaseTypes {
  // BaseTypes
  paragraph = 'paragraph',
  heading = 'heading',
  horizontalRow = 'horizontalRow',
  fence = 'fence',
  orderedList = 'orderedList',
  bulletList = 'bulletList',
  blockquote = 'blockquote',
  table = 'table',
}

export enum SubTypes {
  // SubTypes
  text = 'text',
  link = 'link',
  emphasis = 'emphasis',
  strong = 'strong',
  strikethrough = 'strikethrough',
  codeInline = 'codeInline',
  image = 'image',
  hardbreak = 'hardbreak',
  softbreak = 'softbreak',
}

export type BaseNode
  = Paragraph
  | Heading
  | HorizontalRow
  | Fence
  | OrderedList
  | BulletList
  | Blockquote
  | Table;

export type SubNode
  = Text
  | Link
  | Emphasis
  | Strong
  | Strikethrough
  | CodeInline
  | Image
  | HardBreak
  | SoftBreak;

export type InlineSection = SubNode[];

export type MarkdownDoc = BaseNode[];

/* Base Types */

export interface Paragraph {
  type: BaseTypes.paragraph;
  parts: InlineSection;
}

export interface Heading {
  type: BaseTypes.heading;
  parts: InlineSection;
  size: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface HorizontalRow {
  type: BaseTypes.horizontalRow;
}

// Could be more interesting in the future
export interface Fence {
  type: BaseTypes.fence;
  value: string;
  lang: string;
}

export type ListItem = Array<Paragraph | BulletList | OrderedList>;

export interface OrderedList {
  type: BaseTypes.orderedList;
  list: ListItem[];
}

export interface BulletList {
  type: BaseTypes.bulletList;
  list: ListItem[];
}

export interface Blockquote {
  type: BaseTypes.blockquote;
  parts: InlineSection;
}

export type alignment = 'left' | 'center' | 'right';

export interface Cell {
  parts: InlineSection;
  align: alignment;
}

export interface Row {
  columns: Cell[];
}

export interface Table {
  type: BaseTypes.table;
  head: Row;
  body: Row[];
}

/* Sub Types */

export interface Text {
  type: SubTypes.text;
  value: string;
}

export interface Link {
  type: SubTypes.link;
  parts: InlineSection;
  dest: string;   // url, file reference, or anchor reference
  title?: string; // Hover text
}

export interface Emphasis {
  type: SubTypes.emphasis;
  parts: InlineSection;
}

export interface Strong {
  type: SubTypes.strong;
  parts: InlineSection;
}

export interface Strikethrough {
  type: SubTypes.strikethrough;
  parts: InlineSection;
}

export interface CodeInline {
  type: SubTypes.codeInline;
  value: string;
}

export interface Image {
  type: SubTypes.image;
  src: string;
  title?: string;
  alt?: string;
}

// 0 or 1 space + newline
export interface HardBreak {
  type: SubTypes.hardbreak;
}

// 2 or more spaces + newline
export interface SoftBreak {
  type: SubTypes.softbreak;
}
