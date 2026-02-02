import js from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
    // Base JS rules
    js.configs.recommended,

    // TypeScript rules
    ...tseslint.configs.recommended,

    // Angular (TypeScript)
    {
        files: ["**/*.ts"],
        processor: "@angular-eslint/template/extract-inline-html",
        plugins: {
            "@angular-eslint": angular,
            "@angular-eslint/template": angularTemplate,
        },
        rules: {
            "@angular-eslint/component-class-suffix": ["error", { suffixes: ["Component", "View"] }],
            "@angular-eslint/directive-class-suffix": ["error", { suffixes: ["Directive"] }],
        },
    }
    ,

    // Angular templates
    {
        files: ["**/*.html"],
        languageOptions: {
            parser: angularTemplateParser,
        },
        plugins: {
            "@angular-eslint/template": angularTemplate,
        },
        rules: {
            "@angular-eslint/template/no-negated-async": "error",
        },
    },
];
