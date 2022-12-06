declare const Base: {
    /**
     * 获取数据类型
     * @param params
     * @returns 'String','Number'...
     */
    getTypeOf: (params: unknown) => string | undefined;
    /**
     * 使用keyof进行判断
     * key值的类型不是string，在javascript中是默认给你转好的，而在Typescript中则不是
     * @param key
     * @param object
     * @returns
     */
    isValidKey: (key: string | number | symbol, object: object) => key is never;
};
export default Base;
