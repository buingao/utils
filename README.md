# utils 工具包

> 开头语：
>
> 整理收集工作中遇到的各种工具函数，提高工作效率，保持开发的统一、稳定、可持续。
>
> 同样希望帮助更多的人实现相同的目的，成人达己。

## 遇到的问题

1. `(!) Plugin typescript: @rollup/plugin-typescript: Rollup requires that TypeScript produces ES Modules. Unfortunately your configuration specifies a "module" other than "esnext". Unless you know what you're doing, please change "module" to "esnext" in the target tsconfig.json file or plugin options.`

解问题：修改 tsconfig.json 中`"module": "ESNext"`
