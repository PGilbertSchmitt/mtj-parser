# Marker
## The Markdown-to-Json Parser
---

Parsers already exist aplenty for transforming Markdown into HTML. However, I don't want to use the HTML output of a parser I don't know and inject it unsafely into a ReactJS component. The problem is that the best parser I could find that _doesn't_ convert my input directly into HTML is [markdown-it](https://github.com/markdown-it/markdown-it), but the output is not as easy to convert into nested components as I would like. It's more akin to an array of token-like objects, with things like "open paragraph" and a matching "close paragraph", with all the paragraph tokens between them. The design is too linear for me, it would be better to have a tree. So, rather than reinvent the wheel, I've wrapped `markdown-it` with my own pseudo-parser, converting the serial structure into a nested structure that is better better for building components around. It's more like _unflattening_ (?) than _text parsing_, and since parsing text is a nightmare, I'll just piggyback off of [puzrin's](https://github.com/puzrin) hard work. 

I CAN'T HEAR YOU LALALALA

The output is something that I can more easily manipulate, which makes me happier. Also, I'm learning, and at the end of the day, isn't that all that matters?