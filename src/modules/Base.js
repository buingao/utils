"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base = {
    /**
     * 获取数据类型
     * @param params
     * @returns 'String','Number'...
     */
    getTypeOf: function (params) {
        var _a;
        var type = Object.prototype.toString.call(params);
        return (_a = type.match(/\[\w+\W(\w+)\]$/)) === null || _a === void 0 ? void 0 : _a[1];
    },
    /**
     * 使用keyof进行判断
     * key值的类型不是string，在javascript中是默认给你转好的，而在Typescript中则不是
     * @param key
     * @param object
     * @returns
     */
    isValidKey: function (key, object) {
        return key in object;
    }
    /**
     * 深拷贝
     * @param obj 需要深拷贝的对象
     * @returns
     */
    // deepClone: (obj: Object) => {
    //   // 不是引用类型或者是null的话直接返回
    //   if (typeof obj !== 'object' || obj === null) {
    //     return obj
    //   }
    //   // 初始化结果
    //   let result = {}
    //   if (obj instanceof Array) {
    //     result = []
    //   }
    //   for (const key in obj) {
    //     // 保证不是原型上的属性
    //     // obj.hasOwnProperty(key)
    //     if (Object.prototype.hasOwnProperty.call(obj, key)) {
    //       if (Base.isValidKey(key, obj)) {
    //         // 递归调用
    //         result[key] = Base.deepClone(obj[key])
    //       }
    //     }
    //   }
    //   return result
    // }
};
exports.default = Base;
