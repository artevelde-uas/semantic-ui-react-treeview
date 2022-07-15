const jsdoc2md = require('jsdoc-to-markdown');
const ast = require('mkast');
const lvl = require('mklevel');
const out = require('mkout');
const { createWriteStream } = require('fs');


// Build the API documentation from the JSX source files
jsdoc2md.render({ files: '../lib/src/**/*.jsx' }).then(value => {
    ast.src(value)
        // Increment heading levels by one
        .pipe(lvl({ all: 1 }))
        .pipe(out())
        .pipe(createWriteStream('./build/api.md'));
});
