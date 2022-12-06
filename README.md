# utils 工具包

> 开头语：
>
> 整理收集工作中遇到的各种工具函数，提高工作效率，保持开发的统一、稳定、可持续。
>
> 同样希望帮助更多的人实现相同的目的，成人达己。
>
> 代码即架子，编写自己的 src 代码

## install

`npm install @gornin/utils`

`yarn add @gornin/utils`

## api

### Base

`getTypeOf`

获取基本类型、原生引用类型数据的类型，首字母大写

`isValidKey`

### Validate

#### idno 校验

`checkIdNoStrict`

严格校验，校验内在逻辑

`checkIdNoByBasicLogic`

校验基本格式，出生日期等，表观看不出异常的那种身份证号

`checkIdNoByLength`

仅校验长度。15 位或 18 位

### UrlHandler

`obj2queryParams`

将参数对象转成 url 查询参数

如：

```js
import { UrlHandler } from '@gornin/utils'
UrlHandler.obj2queryParams({ name: 'gornin', score: 100, age: undefined })
// 'name=gornin&score=100'
```
