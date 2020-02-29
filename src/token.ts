export enum TokenType {
  paragraph_open = 'paragraph_open',
  paragraph_close = 'paragraph_close',
  inline = 'inline',
  text = 'text',
  link_open = 'link_open',
  link_close = 'link_close',
  heading_open = 'heading_open',
  heading_close = 'heading_close',
  hardbreak = 'hardbreak',
  fence = 'fence',
  em_open = 'em_open',
  em_close = 'em_close',
  strong_open = 'strong_open',
  strong_close = 'strong_close',
  s_open = 's_open',
  s_close = 's_close',
  ordered_list_open = 'ordered_list_open',
  ordered_list_close = 'ordered_list_close',
  bullet_list_open = 'bullet_list_open',
  bullet_list_close = 'bullet_list_close',
  list_item_open = 'list_item_open',
  list_item_close = 'list_item_close',
  softbreak = 'softbreak',
  image = 'image',
  code_inline = 'code_inline',
  table_open = 'table_open',
  table_close = 'table_close',
  thead_open = 'thead_open',
  thead_close = 'thead_close',
  tbody_open = 'tbody_open',
  tbody_close = 'tbody_close',
  tr_open = 'tr_open',
  tr_close = 'tr_close',
  th_open = 'th_open',
  th_close = 'th_close',
  td_open = 'td_open',
  td_close = 'td_close',
  blockquote_open = 'blockquote_open',
  blockquote_close = 'blockquote_close',
  hr = 'hr',
}

// Based on the token type in node_modules/@types/markdown-it/lib/token.d.ts
export interface Token {
  type: TokenType;
  tag: string;
  attrs: string[][];
  map: number[] | null;
  nesting: number;
  level: number;
  children: Token[] | null;
  content: string;
  markup: string;
  info: string;
  meta: null;
  block: boolean;
  hidden: boolean;
}
