# MTF-Parser
## The Markdown-to-JSON Parser
---

Parsers already exist aplenty for transforming Markdown into HTML. However, I don't want to use the HTML output of a parser I don't know and inject it unsafely into a ReactJS component. The problem is that the best parser I could find that _doesn't_ convert my input directly into HTML is [markdown-it](https://github.com/markdown-it/markdown-it), but the output is not as easy to convert into nested components as I would like. It's more akin to an array of token-like objects, with things like "open paragraph" and a matching "close paragraph", with all the paragraph tokens between them. The design is too linear for me, it would be better to have a tree. So, rather than reinvent the wheel, I've wrapped `markdown-it` with my own pseudo-parser, converting the serial structure into a nested structure that is better better for building components around. It's more like _unflattening_ (?) than _text parsing_, and since parsing text is a nightmare, I'll just piggyback off of [puzrin's](https://github.com/puzrin) hard work.

The output is something that I can more easily manipulate, which makes me happier. Also, I'm learning, and at the end of the day, isn't that all that matters?

The [rubric file](./rubric.md) shows all the currently supported Markdown formatting.

### Install

`npm install mtj-parser`

### How-to

Simple use the `parseMarkdown` function, which should return a happy, nested markdown document:

JavaScript:
```JavaScript
import { parseMarkdown } from 'mtj-parser';

const mdString = `
# This is **Markdown**
`;

const mdObject = parseMarkdown(mdString);
// [
//   {
//     type: "heading",
//     parts: [
//       {
//         type: "text",
//         value: "This is "
//       },
//       {
//         type: "strong",
//         parts: [
//           {
//             type: "text",
//             value: "Markdown"
//           }
//         ]
//       },
//       {
//         type: "text",
//         value: ""
//       }
//     ],
//     size: 1
//   }
// ]
```

### Node types

Being written in TypeScript means that there are types available for the different node types, and can be imported from the index of the library along with the `parseMarkdown` function.

The nodes are split into two categories: `BaseNodes` and `SubNodes`. The root of the object is a `MarkdownDoc`, which is just an array of `BaseNodes`. `BaseNodes` are the overall structure of a top-level Markdown element. Most `BaseNodes` contain `SubNodes`, which are the text styling and control elements.

#### MarkdownDoc
Returned from `parseMarkdown(str)`
```TypeScript
type MarkdownDoc = BaseNode[];
```

#### BaseNode
Union type for all types of `BaseNodes`
```TypeScript
type BaseNode
  = Paragraph
  | Heading
  | HorizontalRow
  | Fence
  | OrderedList
  | BulletList
  | Blockquote
  | Table;
```

#### SubNode
Union type for all types of `SubNodes`
```TypeScript
type SubNode
  = Text
  | Link
  | Emphasis
  | Strong
  | Strikethrough
  | CodeInline
  | Image
  | HardBreak
  | SoftBreak;
```

#### BaseTypes and SubTypes

These two exports are enums whose values are assigned to the `type` members of the following nodes in order to quickly identify their type. The values of the enum members are strings, which is helpful for debugging.

#### Paragraph
```TypeScript
interface Paragraph {
  type: BaseTypes.paragraph;
  parts: SubNode[];
}
```

#### Heading
```TypeScript
interface Heading {
  type: BaseTypes.heading;
  parts: SubNode[];
  size: 1 | 2 | 3 | 4 | 5 | 6;
}
```

#### HorizontalRow
```TypeScript
interface HorizontalRow {
  type: BaseTypes.horizontalRow;
}
```

#### Fence
```TypeScript
interface Fence {
  type: BaseTypes.fence;
  value: string;
  lang: string;
}
```

#### ListItem
Not a node, but used by both Ordered and Bullet lists to contain the elements, which can be a `Paragraph` or either list type, which is how nested lists work.

```TypeScript
type ListItem = Array<Paragraph | BulletList | OrderedList>;
```

#### OrderedList
```TypeScript
interface OrderedList {
  type: BaseTypes.orderedList;
  list: ListItem[];
}
```

#### BulletList
```TypeScript
interface BulletList {
  type: BaseTypes.bulletList;
  list: ListItem[];
}
```

#### Blockquote
```TypeScript
interface Blockquote {
  type: BaseTypes.blockquote;
  parts: SubNode[];
}
```

#### Table
Tables make use of two non-node types, `Cell` and `Row`:
```TypeScript
interface Cell {
  parts: SubNode[];
  align: alignment;
}

interface Row {
  columns: Cell[];
}

interface Table {
  type: BaseTypes.table;
  head: Row;
  body: Row[];
}
```

#### Text
```TypeScript
interface Text {
  type: SubTypes.text;
  value: string;
}
```

#### Link
```TypeScript
interface Link {
  type: SubTypes.link;
  parts: SubNode[];
  dest: string;   // url, file reference, or anchor reference
  title?: string; // Hover text
}
```

#### Emphasis
```TypeScript
interface Emphasis {
  type: SubTypes.emphasis;
  parts: SubNode[];
}
```

#### Strong
```TypeScript
interface Strong {
  type: SubTypes.strong;
  parts: SubNode[];
}
```

#### Strikethrough
```TypeScript
interface Strikethrough {
  type: SubTypes.strikethrough;
  parts: SubNode[];
}
```

#### CodeInline
```TypeScript
interface CodeInline {
  type: SubTypes.codeInline;
  value: string;
}
```

#### Image
```TypeScript
interface Image {
  type: SubTypes.image;
  src: string;
  title?: string;
  alt?: string;
}
```

#### HardBreak
A hard break is made by following a line with 2 or more spaces and a newline
```TypeScript
interface HardBreak {
  type: SubTypes.hardbreak;
}
```

#### SoftBreak
A soft break is made by following a line with 0 or 1 space and a newline
```TypeScript
interface SoftBreak {
  type: SubTypes.softbreak;
}
```
