module.exports = {
    "parser": "",
    "plugins": [],
    "extends": [ "eslint:recommended", "airbnb" ],
    "ignorePatterns": [
        "node_modules",
        "coverage",
        "customStubs",
    ],
    "parserOptions": {
        "ecmaVersion": 2021,
        "sourceType": "module",
    },
    "globals": {
        "define": "readonly",
        "localStorage": "readonly",
        "navigator": "readonly",
        "chrome": "readonly",
        "document": "readonly",
        "Blob": "readonly",
        "log": "readonly",
        "alert": "readonly",
        "confirm": "readonly",
        "history": "readonly",
        "console": "readonly",
        "window": "readonly",
        "location": "readonly",
        "setTimeout": "readonly",
        "ArrayBuffer": "readonly",
        "Uint8Array": "readonly",
        "Promise": "readonly",
        "URLSearchParams": "readonly",
        "URL": "readonly",
        "fetch": "readonly",
        "require": "readonly",
        "module": "readonly",
        "Set": "readonly",
        "FileReader": "readonly",
        "prompt": "readonly",
    },
    "rules": {
        "no-console": "off",
        "global-require": "off",
        "import/no-dynamic-require": "off",
        "no-script-url": "off",
        "no-param-reassign": "off",
        "no-shadow": "off",
        "no-tabs": [ "error", { "allowIndentationTabs": true } ],
        "no-plusplus": [ "warn", {
            "allowForLoopAfterthoughts": true,
        } ],
        "prefer-template": "warn",
        "no-use-before-define": "off",
        "no-undef": "error",
        "no-cond-assign": "off",
        "no-unreachable": "off",
        "no-irregular-whitespace": "error",
        "no-unexpected-multiline": "error",
        "curly": [
            "warn",
            "multi-line",
        ],
        "no-invalid-this": "warn",
        "no-multi-spaces": "warn",
        "no-multi-str": "warn",
        "no-new-wrappers": "warn",
        "no-throw-literal": "off",
        "no-with": "warn",
        "prefer-promise-reject-errors": "warn",
        "space-infix-ops": [
            "warn",
        ],
        "no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "args": "all",
            },
        ],
        "array-bracket-newline": [
            "warn",
            "consistent",
        ],
        "array-bracket-spacing": [
            "warn",
            "always",
        ],
        "array-element-newline": [
            "warn",
            "consistent",
        ],
        "block-spacing": [
            "warn",
            "never",
        ],
        "brace-style": [
            "warn",
            "stroustrup",
            {
                "allowSingleLine": true,
            },
        ],
        "camelcase": [
            "warn",
            {
                "properties": "never",
            },
        ],
        "comma-dangle": [
            "error",
            {
                "arrays": "always-multiline",
                "objects": "always-multiline",
                "imports": "never",
                "exports": "never",
                "functions": "never",
            },
        ],
        "comma-spacing": "warn",
        "comma-style": "warn",
        "computed-property-spacing": "warn",
        "eol-last": "warn",
        "func-call-spacing": "warn",
        "indent": [
            "warn",
            4,
        ],
        "key-spacing": "warn",
        "keyword-spacing": "warn",
        "linebreak-style": "warn",
        "max-len": [ "error", 150, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        } ],
        "new-cap": "warn",
        "no-array-constructor": "warn",
        "no-mixed-spaces-and-tabs": "warn",
        "no-multiple-empty-lines": [
            "warn",
            {
                "max": 2,
            },
        ],
        "object-property-newline": [
            "warn",
            {
                "allowMultiplePropertiesPerLine": true,
            },
        ],
        "no-new-object": "warn",
        "no-trailing-spaces": "warn",
        "object-curly-spacing": [
            "warn",
            "always",
        ],
        "object-curly-newline": [
            "warn",
            {
                "consistent": true,
            },
        ],
        "operator-linebreak": [
            "warn",
            "after",
        ],
        "padded-blocks": [ "error", {
            blocks: "never",
            classes: "never",
            switches: "never",
        }, {
            allowSingleLineBlocks: true,
        } ],
        "quote-props": [
            "warn",
            "consistent",
        ],
        "quotes": [
            "warn",
            "double",
            {
                "allowTemplateLiterals": true,
            },
        ],
        "semi": "error",
        "semi-spacing": "warn",
        "space-before-blocks": "warn",
        "space-before-function-paren": [
            "warn",
            {
                "asyncArrow": "always",
                "anonymous": "never",
                "named": "never",
            },
        ],
        "space-in-parens": [
            "warn",
            "always",
            {
                "exceptions": [
                    "{}",
                    "[]",
                    "()",
                    "empty",
                ],
            },
        ],
        "spaced-comment": [
            "warn",
            "always",
            { "exceptions": [ "inline-html" ] },
        ],
        "arrow-parens": [
            "warn",
            "always",
        ],
        "arrow-spacing": [
            "warn",
            {
                "before": true,
                "after": true,
            },
        ],
        "generator-star-spacing": [
            "error",
            "after",
        ],
        "no-new-symbol": "warn",
        "no-this-before-super": "warn",

        // allow for netsuite define
        "import/no-amd": "off",
        "no-restricted-syntax": "off",
        "no-continue": "off",
    },
};
