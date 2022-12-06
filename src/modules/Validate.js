"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Base_1 = __importDefault(require("./Base"));
// 加权因子
var weightFactor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
// 校验码
var checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
// 身份证号正则，身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
var idNoReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 身份证号格式的正则思路，支持2029年，2030之后这条正则就不满足了
var idcardPattern = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0-2][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
// 城市代码列表
var identityCodeCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
};
var validate = {
    idno: {
        /**
         * 获取最后一位加权因子值
         * @param code 身份正号前17位
         * @returns
         */
        getIdnoWeightingFactor: function (code) {
            var total = "".concat(code).split('').reduce(function (t, cv, ci, arr) {
                return t + weightFactor[ci] * +cv;
            }, 0);
            var remainder = total % 11;
            return checkCode[remainder];
        },
        /**
         * 根据身份证号获取性别
         * @param idno
         * @returns '1' boy/man/男 '0' girl/woman/女 '-1' 身份证号错误
         */
        getGenderByIdno: function (idno) {
            // 排除空格
            var idNo = idno.replace(/\s*/g, '');
            if (!validate.idno.checkIdNoByBasicLogic(idNo)) {
                return '-1';
            }
            var i17 = parseInt(idNo.substring(idNo.length === 18 ? 17 : 14, 1), 10);
            // 第17位或第14位数字，用来表示性别，奇数为男，偶数为女
            var gender = i17 % 2 === 0 ? '0' : '1';
            return gender;
        },
        /**
         * 通过身份证号获取姓名
         * @param idno
         * @returns
         */
        getBirthdayByIdno: function (idno) {
            var idNo = idno.replace(/\s*/g, '');
            if (!validate.idno.checkIdNoByBasicLogic(idNo)) {
                return '-1';
            }
            var tmpStr = idNo.length === 18
                ? idNo.substring(6, 14)
                : '19' + idNo.substring(6, 12);
            return [
                tmpStr.substring(0, 4),
                tmpStr.substring(4, 6),
                tmpStr.substring(6)
            ];
        },
        /**
         * 身份证号简单校验，位数正确即可
         * @param idno
         * @returns
         */
        checkIdNoByLength: function (idno) {
            // 检查号码是否符合规范，包括长度，类型
            return idNoReg.test(idno);
        },
        /**
         * 身份证号校验，基本格式正确，肉眼看不出问题
         * @param idno
         * @returns
         */
        checkIdNoByBasicLogic: function (idno) {
            return idcardPattern.test(idno);
        },
        /**
         * 15位转18位身份证号
         * @param idno
         * @returns
         */
        changeFivteenToEighteen: function (idno) {
            if (idno.length === 15) {
                var card = idno.substring(0, 6) + '19' + idno.substr(6, idno.length - 6);
                var wfcode = validate.idno.getIdnoWeightingFactor(card);
                return "".concat(card).concat(wfcode);
            }
            return idno;
        },
        /**
         * 取身份证前两位，校验省份
         * @param card
         * @returns
         *
         * 解决 元素隐式具有 “any“ 类型，因为类型为 “string“ 的表达式不能用于索引类型 “Object“。 在类型 “Object“ 上找不到具有类型为 “string“ 的参数的索引签名
         */
        checkProvince: function (card) {
            var provinceCode = card.substring(0, 2);
            if (Base_1.default.isValidKey(provinceCode, identityCodeCity)) {
                return identityCodeCity[provinceCode] !== undefined;
            }
            return false;
        },
        /**
         * 校验出生日期
         * @param year
         * @param month
         * @param day
         * @param birthday
         * @returns
         */
        verifyBirthday: function (year, month, day, birthday) {
            // 校验日期 ，15位以'19'年份来进行补齐。
            var now = new Date();
            var nowYear = now.getFullYear();
            // 年月日是否合理
            if (birthday.getFullYear() === +year &&
                birthday.getMonth() + 1 === +month &&
                birthday.getDate() === +day) {
                // 判断年份的范围（3岁到150岁之间)
                var time = nowYear - +year;
                return time >= 3 && time <= 150;
            }
            return false;
        },
        checkBirthday: function (card) {
            // 检查生日是否正确，15位以'19'年份来进行补齐。
            var len = card.length;
            // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
            if (len === 15) {
                var regFifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                var arrData = card.match(regFifteen); // 正则取号码内所含出年月日数据
                if (Array.isArray(arrData)) {
                    var year = arrData[2];
                    var month = arrData[3];
                    var day = arrData[4];
                    var birthday = new Date('19' + year + '/' + month + '/' + day);
                    return validate.idno.verifyBirthday('19' + year, month, day, birthday);
                }
            }
            // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
            if (len === 18) {
                var regEighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
                var arrData = card.match(regEighteen); // 正则取号码内所含出年月日数据
                if (Array.isArray(arrData)) {
                    var year = arrData[2];
                    var month = arrData[3];
                    var day = arrData[4];
                    var birthday = new Date(year + '/' + month + '/' + day);
                    return validate.idno.verifyBirthday(year, month, day, birthday);
                }
            }
            return false;
        },
        /**
         * 校验位的检测
         * @param card
         * @returns
         */
        checkParity: function (card) {
            var idno = validate.idno.changeFivteenToEighteen(card); // 15位转18位
            if (idno.length === 18) {
                // 根据前17位计算出第18位的值
                var wfcode = validate.idno.getIdnoWeightingFactor(idno.substring(0, 17));
                return wfcode === idno.substr(17, 1);
            }
            return false;
        },
        /**
         * 严格校验，校验加权因子，再严格只能接入公安系统查询
         * @param idno
         */
        checkIdNoStrict: function (idno) {
            /*
             * 1~2 所在省（直辖市、自治区）的代码
             * 3~4 所在地级市（自治州）的代码
             * 5~6 所在区（县、自治县、县级市）的代码
             * 7~10 出生年份
             * 11~12 出生月份
             * 13~14 出生日
             * 15~16 所在派出所代码
             * 17 奇数代表男性，偶数代表女性
             * 18 校验码，生成规则参考上方的ISO 7064:1983.MOD 11-2算法
             */
            // 是否为空 + 校验长度，类型 + 检查省份 + 校验生日 + 检验位的检测
            var isPass = !(idno === '') &&
                validate.idno.checkIdNoByLength(idno) &&
                validate.idno.checkProvince(idno) &&
                validate.idno.checkBirthday(idno) &&
                validate.idno.checkParity(idno);
            return isPass;
        }
    }
};
exports.default = validate;
