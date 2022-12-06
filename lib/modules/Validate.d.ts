declare const validate: {
    idno: {
        /**
         * 获取最后一位加权因子值
         * @param code 身份正号前17位
         * @returns
         */
        getIdnoWeightingFactor: (code: string) => string;
        /**
         * 根据身份证号获取性别
         * @param idno
         * @returns '1' boy/man/男 '0' girl/woman/女 '-1' 身份证号错误
         */
        getGenderByIdno: (idno: string) => "1" | "0" | "-1";
        /**
         * 通过身份证号获取姓名
         * @param idno
         * @returns
         */
        getBirthdayByIdno: (idno: string) => string[] | "-1";
        /**
         * 身份证号简单校验，位数正确即可
         * @param idno
         * @returns
         */
        checkIdNoByLength: (idno: string) => boolean;
        /**
         * 身份证号校验，基本格式正确，肉眼看不出问题
         * @param idno
         * @returns
         */
        checkIdNoByBasicLogic: (idno: string) => boolean;
        /**
         * 15位转18位身份证号
         * @param idno
         * @returns
         */
        changeFivteenToEighteen: (idno: string) => string;
        /**
         * 取身份证前两位，校验省份
         * @param card
         * @returns
         *
         * 解决 元素隐式具有 “any“ 类型，因为类型为 “string“ 的表达式不能用于索引类型 “Object“。 在类型 “Object“ 上找不到具有类型为 “string“ 的参数的索引签名
         */
        checkProvince: (card: string) => boolean;
        /**
         * 校验出生日期
         * @param year
         * @param month
         * @param day
         * @param birthday
         * @returns
         */
        verifyBirthday: (year: string, month: string, day: string, birthday: Date) => boolean;
        checkBirthday: (card: string) => boolean;
        /**
         * 校验位的检测
         * @param card
         * @returns
         */
        checkParity: (card: string) => boolean;
        /**
         * 严格校验，校验加权因子，再严格只能接入公安系统查询
         * @param idno
         */
        checkIdNoStrict: (idno: string) => boolean;
    };
};
export default validate;
