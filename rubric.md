# This is an h1 header 

## This is an h2 header

### This is an h3 header

#### This is an h4 header

##### This is an h5 header

###### This is an h6 header

---

***

___

This is a paragraph

This is a paragraph
with a softbreak with no spaces

This is a paragraph 
with a softbreak with one space

This is a paragraph  
with a hardbreak with two spaces

This is a text with an *italic style*, a **bold style**, a ~~strikethrough~~, and `inlined code`.

```
// This code block has no language
// That means it's generic and unstyled
```

```javascript
const x = 'This is a code block';
const y = 'Hello mom!';
```

```ruby
# Something more complicated to ensure formatting stays consistent
def fib(places)

     a = 0
     b = 1

     while a < places do
          puts a + "\n"
          a = b
          b = a + b
     end
end

puts fib(1000)
```

This is an [inline link](www.example.com)

This is an [inline link](www.example.com "With a title")

This is a [reference link][reference text]

This is an [internal reference link](./src/ast.ts)

This is a [reference link] using its own text as a reference

[reference text]: www.example.com
[reference link]: www.example.com

![first alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mumbai_Train.JPG/1280px-Mumbai_Train.JPG "First title text")

![second alt text][image reference]

[image reference]: https://upload.wikimedia.org/wikipedia/commons/5/5a/City_of_Rockhampton_train_%28Sunshine_railway_station%2C_Brisbane%29.jpg "Second title text"

This *paragraph has **nested** styles*

[This link has a **style** inside it](www.example.com)


This paragraph has a ~~[**bold link**](www.example.com)~~ with a line through it

1. First item 
   With more

2. Second item

   And then some

3. Third item

* An item
* Another item
* Yet another item

+ A list
   + That is
      + Nested
   + Which
   + Is
+ Interesting

1. You can
   + even
      1. nest
      2. with
   + mixed
   + list
2. types

| Tables        |      Are      |   Cool |
|:--------------|:-------------:|-------:|
| *col 3 is*    | right-aligned |  $1600 |
| col 2 is      | **centered**  |    $12 |
| zebra stripes |   are neat    | ~~$1~~ |

---

> This is a block quote with **internal styles**.

### This header has **internal styles** within it