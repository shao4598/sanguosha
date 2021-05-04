module.exports = {
  //每行最大字符数量
  //Specify the line length that the printer will wrap on.
  //Default: 80
  printWidth: 80,

  //缩进长度
  //Specify the number of spaces per indentation-level.
  //Default: 2
  tabWidth: 2,

  //使用 Tab 代替空格作为缩进
  //Indent lines with tabs instead of spaces.
  //Default: false
  useTabs: false,

  //结尾处书写分号
  //Print semicolons at the ends of statements.
  //Default: true
  semi: false,

  //使用单引号代替双引号
  //Use single quotes instead of double quotes.
  //Default: false
  singleQuote: true,

  //对象的属性名是否使用引号
  //Change when properties in objects are quoted.
  //Valid options:
  //"as-needed" - Only add quotes around object properties where required.
  //"consistent" - If at least one property in an object requires quotes, quote all properties.
  //"preserve" - Respect the input use of quotes in object properties.
  //Default: "as-needed"
  quoteProps: "as-needed",

  //强制 JSX 使用单引号代替双引号
  //Use single quotes instead of double quotes in JSX.
  //Default: false
  jsxSingleQuote: false,

  //数组与对象的最后一个成员是否使用逗号
  //Print trailing commas wherever possible when multi-line. (A single-line array, for example, never gets trailing commas.)
  //Valid options:
  //"es5" - Trailing commas where valid in ES5 (objects, arrays, etc.)
  //"none" - No trailing commas.
  //"all" - Trailing commas wherever possible (including trailing commas in function parameter lists and calls). This requires node 8 or a modern browser that supports ES2017 or transform with babel.
  //Default: "es5"
  trailingComma: "all",

  //花括号内加空格
  //Print spaces between brackets in object literals.
  //Valid options:
  //true - Example: { foo: bar }.
  //false - Example: {foo: bar}.
  //Default: true
  bracketSpacing: true,

  //JSX 标签最后一个 > 不换行
  //Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements).
  //Default: false
  jsxBracketSameLine: false,

  //函数的参数是否加括号
  //Include parentheses around a sole arrow function parameter.
  //Valid options:
  //"always" - Always include parens. Example: (x) => x
  //"avoid" - Omit parens when possible. Example: x => x
  //Default: "always"
  arrowParens: "always",

  //是否对 HTML 的空格敏感（设置 ignore 解决格式化 vue template 时把最后一个 > 强制换行问题）
  //Specify the global whitespace sensitivity for HTML files, see whitespace-sensitive formatting for more info.
  //Valid options:
  //"css" - Respect the default value of CSS display property.
  //"strict" - Whitespaces are considered sensitive.
  //"ignore" - Whitespaces are considered insensitive.
  //Default: "css"
  htmlWhitespaceSensitivity: "ignore",

  //Vue 文件内的 <script> <style> 标签内的第一行代码使用缩进
  //Whether or not to indent the code inside <script> and <style> tags in Vue files. Some people (like the creator of Vue) don’t indent to save an indentation level, but this might break code folding in your editor.
  //Valid options:
  //false - Do not indent script and style tags in Vue files.
  //true - Indent script and style tags in Vue files.
  //Default: false
  vueIndentScriptAndStyle: false
}
