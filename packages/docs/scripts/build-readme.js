const doc = require('mkdoc');
const pi = require('mkpi');
const out = require('mkout');
const { createWriteStream } = require('fs');


// Build the README.md file from markdown source files
doc('./src/readme.md')
    .pipe(pi())
    .pipe(out())
    .pipe(createWriteStream('../../README.md'));
