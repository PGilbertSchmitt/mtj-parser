# Marker

Parsers already exist aplenty for transforming Markdown into HTML. However, I don't want to use the HTML output of a parser I don't know and inject it unsafely into a react component. Rather than reinvent the wheel, I'm using the array of tokens spat out by [markdown-it](https://github.com/markdown-it/markdown-it) and "parsing" it into a better structure that I can build components around. It's more like restructuring nested token arrays than text parsing, but due to the structure of Markdown-It's ast, I'm treating it like parsing. I CAN'T HEAR YOU LALALALA

The output is something that I can control, which makes me happier. Also, I'm learning, and at the end of the day, isn't that all that matters?