const {JSDOM} = require('jsdom');

const html = `
<div><p>Hello <span>World</span></p></div>
`;

const dom = new JSDOM(html);

console.log(dom.window.document.querySelector('div').textContent)

