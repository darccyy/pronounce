var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
module.exports = {
    /* Error */
    InputError: /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(message) {
            var _this = _super.call(this, message) || this;
            _this.name = "Fortissimo - InputError";
            return _this;
        }
        return class_1;
    }(Error)),
    EnvError: /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2(message) {
            var _this = _super.call(this, "Current environment does not support " + message) || this;
            _this.name = "Fortissimo - EnvError";
            return _this;
        }
        return class_2;
    }(Error)),
    DormantError: /** @class */ (function (_super) {
        __extends(DormantError, _super);
        function DormantError() {
            var _this = _super.call(this, "This function is not implemented yet! Try use an older version, or hold tight!") || this;
            _this.name = "Fortissimo - DormantError";
            return _this;
        }
        return DormantError;
    }(Error)),
    // Check environment
    env: {
        DOM: function () {
            try {
                window;
                document;
            }
            catch (_a) {
                return false;
            }
            return true;
        },
        NODE: function () {
            try {
                process;
            }
            catch (_a) {
                return false;
            }
            return true;
        }
    },
    /* String */
    fill: function (string, amount, char, reverse) {
        if (amount === void 0) { amount = 10; }
        if (char === void 0) { char = " "; }
        if (reverse === void 0) { reverse = false; }
        var fill = char.repeat(Math.max(0, amount - string.length));
        return reverse ? fill + string : string + fill;
    },
    center: function (string, amount, char, preferLeft) {
        if (amount === void 0) { amount = 10; }
        if (char === void 0) { char = " "; }
        if (preferLeft === void 0) { preferLeft = false; }
        var halfAmount = Math.max(0, amount - string.length) / 2;
        var fillFloor = char.repeat(Math.floor(halfAmount));
        var fillCeil = char.repeat(Math.ceil(halfAmount));
        return preferLeft
            ? fillCeil + string + fillFloor
            : fillFloor + string + fillCeil;
    },
    isJSON: function (string) {
        try {
            JSON.parse(string);
        }
        catch (_a) {
            return false;
        }
        return true;
    },
    isURL: function (string) {
        return /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(string);
    },
    isEmail: function (string) {
        return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(string);
    },
    capitalize: function (string, onlyFirst, lowerElse) {
        if (onlyFirst === void 0) { onlyFirst = false; }
        if (lowerElse === void 0) { lowerElse = false; }
        if (!string) {
            return string;
        }
        if (onlyFirst && lowerElse) {
            return string[0].toUpperCase() + string.slice(1).toLowerCase();
        }
        var array = string.split(" ");
        var output = "";
        for (var i = 0; i < array.length; i++) {
            if (!array[i]) {
                continue;
            }
            output +=
                (i ? " " : "") +
                    (!onlyFirst || i === 0 ? array[i][0].toUpperCase() : array[i][0]) +
                    (!lowerElse ? array[i].slice(1) : array[i].slice(1).toLowerCase());
        }
        return output;
    },
    format: function (string) {
        var replace = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            replace[_i - 1] = arguments[_i];
        }
        if (!replace || !string || typeof string !== "string") {
            return string;
        }
        if (typeof replace[0] === "object") {
            replace = replace[0];
        }
        for (var i in replace) {
            string = string.split("{" + i + "}").join(replace[i]);
        }
        return string;
    },
    truncate: function (string, length, char, includeChar) {
        if (length === void 0) { length = 3; }
        if (char === void 0) { char = "..."; }
        if (includeChar === void 0) { includeChar = false; }
        if (string.length <= length) {
            return string;
        }
        return string.slice(0, length - (includeChar ? char.length : 0)) + char;
    },
    replace: function (string, old, char, onlyFirst) {
        if (onlyFirst === void 0) { onlyFirst = false; }
        if (!string || typeof string !== "string") {
            return string;
        }
        if (onlyFirst) {
            return string.replace(old, char);
        }
        return string.split(old).join(char);
    },
    hash: function (string) {
        if (typeof string !== "string") {
            return 0;
        }
        var hash = 0;
        for (var i = 0; i < string.length; i++) {
            var character = string.charCodeAt(i);
            hash = (hash << 5) - hash + character;
            hash = hash & hash;
        }
        return hash;
    },
    redact: function (string, amount, char) {
        if (amount === void 0) { amount = 3; }
        if (char === void 0) { char = "*"; }
        if (string.length <= length) {
            return string;
        }
        if (amount <= 0) {
            return char.repeat(string.length);
        }
        return (string.slice(0, amount) + char.repeat(Math.max(0, string.length - amount)));
    },
    splitAt: function (string, number) {
        if (!string) {
            return [];
        }
        return string.match(new RegExp(".{1," + number + "}", "g")) || [];
    },
    /* Number */
    randomFloat: function (min, max) {
        max = Math.max(min, max);
        min = Math.min(min, max);
        return Math.random() * (max - min) + min;
    },
    randomInt: function (min, max) {
        return Math.round(module.exports.randomFloat(min, max));
    },
    randomChoice: function (array) {
        if (!array) {
            return;
        }
        return array[module.exports.randomInt(0, array.length - 1)];
    },
    round: function (number, decimals) {
        if (decimals === void 0) { decimals = 0; }
        decimals = Math.pow(10, Math.floor(decimals));
        return Math.round(number * decimals) / decimals;
    },
    floor: function (number, decimals) {
        if (decimals === void 0) { decimals = 0; }
        decimals = Math.pow(10, Math.floor(decimals));
        return Math.floor(number * decimals) / decimals;
    },
    ceil: function (number, decimals) {
        if (decimals === void 0) { decimals = 0; }
        decimals = Math.pow(10, Math.floor(decimals));
        return Math.ceil(number * decimals) / decimals;
    },
    border: function (number, min, max) {
        return Math.max(min, Math.min(max, number));
    },
    wrap: function (number, min, max) {
        return module.exports.mod(number - min, max - min) + min;
    },
    hcf: function (a, b) {
        for (var i = Math.floor(a / 2); i > 1; i--) {
            if (!(a % i || b % i)) {
                return i;
            }
        }
        return 1;
    },
    lcm: function (a, b) {
        for (var i = 1; i < b; i++) {
            if (!((a * i) % b)) {
                return a * i;
            }
        }
        return a * b;
    },
    ordinal: function (number) {
        if (isNaN(number)) {
            return "NaNth";
        }
        number = Math.floor(number);
        switch (number.toString().slice(-1)) {
            case "1":
                return number + "st";
            case "2":
                return number + "nd";
            case "3":
                return number + "rd";
        }
        return number + "th";
    },
    bool2bin: function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var string = "";
        for (var i in values) {
            string += values[i] ? 1 : 0;
        }
        return string;
    },
    mod: function (a, b) {
        return a - b * Math.floor(a / b);
    },
    mean: function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var sum = 0;
        var amount = 0;
        for (var i = 0; i < values.length; i++) {
            if (typeof values[i] === "number") {
                sum += values[i];
                amount++;
            }
        }
        return sum / amount;
    },
    addCommas: function (number, ignoreDecimal, interval) {
        if (ignoreDecimal === void 0) { ignoreDecimal = false; }
        if (interval === void 0) { interval = 3; }
        var string = number.toString().split(".")[0];
        length = interval - (string.length % interval);
        var array = module.exports.splitAt("~".repeat(length > interval - 1 ? 0 : Math.abs(length)) + string, interval);
        array[0] = module.exports.replace(array[0], "~", "");
        var decimals = number.toString().split(".")[1];
        return (array.join(",") +
            (decimals
                ? "." +
                    (ignoreDecimal
                        ? decimals
                        : module.exports.splitAt(decimals, interval).join(","))
                : ""));
    },
    snap: function (number, array) {
        throw new module.exports.DormantError();
    },
    pythag: function (a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    },
    apythag: function (a, c) {
        return Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
    },
    /* Date / Time */
    sleep: function (time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    },
    parseTime: function (milliseconds, join, method) {
        if (join === void 0) { join = ", "; }
        if (method === void 0) { method = function (item) {
            return (Math.floor(item.amount).toString() +
                " " +
                (Math.floor(item.amount) === 1 ? item.singular : item.plural));
        }; }
        var units = [
            {
                amount: 1000,
                prefix: "s",
                singular: "second",
                plural: "seconds"
            },
            {
                amount: 60,
                prefix: "m",
                singular: "minute",
                plural: "minutes"
            },
            {
                amount: 60,
                prefix: "h",
                singular: "hour",
                plural: "hours"
            },
            {
                amount: 24,
                prefix: "d",
                singular: "day",
                plural: "days"
            },
            {
                amount: 7,
                prefix: "w",
                singular: "week",
                plural: "weeks"
            },
            {
                amount: 4.34524,
                prefix: "M",
                singular: "month",
                plural: "months"
            },
            {
                amount: 12,
                prefix: "Y",
                singular: "year",
                plural: "years"
            },
            {
                amount: 10,
                prefix: "D",
                singular: "decade",
                plural: "decades"
            },
            {
                amount: 10,
                prefix: "C",
                singular: "century",
                plural: "centuries"
            },
        ];
        var time = [
            {
                amount: milliseconds,
                prefix: "ms",
                singular: "millisecond",
                plural: "millisecond"
            },
        ];
        for (var i in units) {
            if (time[0].amount >= units[i].amount) {
                if (time[0].amount % units[i].amount) {
                    time = __spreadArrays([
                        __assign(__assign({}, units[i]), { amount: Math.floor(time[0].amount / units[i].amount) }),
                        __assign(__assign({}, time[0]), { amount: time[0].amount % units[i].amount })
                    ], time.slice(1));
                }
                else {
                    time = __spreadArrays([
                        __assign(__assign({}, units[i]), { amount: Math.floor(time[0].amount / units[i].amount) })
                    ], time.slice(1));
                }
            }
            else {
                break;
            }
        }
        return time.map(method).filter(function (i) { return i !== undefined; }).join(join);
    },
    getWeek: function (date) {
        if (date === void 0) { date = new Date(); }
        date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
        return Math.ceil(((date.getTime() - Date.UTC(date.getUTCFullYear(), 0, 1)) / 86400000 +
            1) /
            7);
    },
    /* Array */
    removeItem: function (array, item, isIndex, onlyFirst) {
        if (isIndex === void 0) { isIndex = false; }
        if (onlyFirst === void 0) { onlyFirst = false; }
        if (!array || array.length <= 0) {
            return array;
        }
        if (isIndex) {
            return __spreadArrays(array.slice(0, item), array.slice(item + 1));
        }
        var removed = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] !== item) {
                removed.push(array[i]);
            }
            else if (onlyFirst) {
                removed = __spreadArrays(removed, array.slice(i + 1));
                break;
            }
        }
        return removed;
    },
    shuffle: function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    },
    /* Object */
    stringify: function (object, keySeperator, valueSeperator, indent) {
        if (keySeperator === void 0) { keySeperator = ": "; }
        if (valueSeperator === void 0) { valueSeperator = "\n"; }
        if (indent === void 0) { indent = "  "; }
        if (!object || typeof object !== "object") {
            return "";
        }
        var output = [];
        for (var i in object) {
            var value = object[i];
            if (value) {
                if (typeof value === "object") {
                    if (value.constructor === Array) {
                        if (value.length > 0) {
                            value =
                                valueSeperator +
                                    indent +
                                    module.exports.stringify(value, keySeperator, valueSeperator + indent, indent);
                        }
                        else {
                            value = "[]";
                        }
                    }
                    else {
                        if (Object.keys(value).length > 0) {
                            value =
                                valueSeperator +
                                    indent +
                                    module.exports.stringify(value, keySeperator, valueSeperator + indent, indent);
                        }
                        else {
                            value = "{}";
                        }
                    }
                }
                else if (typeof value === "function") {
                    value = "function (" + module.exports
                        .getParameters(value)
                        .join(", ") + ")";
                }
            }
            if (object.constructor === Array) {
                output.push(value);
                continue;
            }
            output.push([i] + keySeperator + value);
        }
        return output.join(valueSeperator);
    },
    sort: function (object, method) {
        throw new module.exports.DormantError();
    },
    deepCopy: function (object) {
        if (object && typeof object === "object") {
            if (object.constructor === Array) {
                var copiedArray = new Array(object.length);
                for (var i = 0; i < object.length; i++) {
                    copiedArray[i] = module.exports.deepCopy(object[i]);
                }
                return copiedArray;
            }
            else {
                var copiedObject = {};
                for (var j in object) {
                    copiedObject[j] = module.exports.deepCopy(object[j]);
                }
                return copiedObject;
            }
        }
        return object;
    },
    decircleJSON: function (object, markReference) {
        if (markReference === void 0) { markReference = null; }
        var cache = [];
        return JSON.parse(JSON.stringify(object, function (key, value) {
            if (value && typeof value === "object") {
                if (cache.includes(value)) {
                    return markReference ? markReference : undefined;
                }
                cache.push(value);
            }
            return value;
        }));
    },
    getParameters: function (func) {
        var string = func
            .toString()
            .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, "");
        var result = string
            .slice(string.indexOf("(") + 1, string.indexOf(")"))
            .match(/([^\s,]+)/g);
        return result === null ? [] : result;
    },
    /* Color */
    toHex: function (number) {
        if (number === 0) {
            return "00";
        }
        if (number) {
            var hex = Math.floor(number).toString(16).toUpperCase();
            if (hex) {
                return hex.length === 1 ? "0" + hex : hex;
            }
        }
        throw new module.exports.InputError("`number` is not defined");
    },
    hex2rgb: function (hex) {
        if (!/^#/.test(hex)) {
            hex = "#" + hex;
        }
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            var string = hex.substring(1);
            if (string.length === 3) {
                string =
                    string[0] + string[0] + string[1] + string[1] + string[2] + string[2];
            }
            var number = parseInt("0x" + string);
            return {
                r: (number >> 16) & 255,
                g: (number >> 8) & 255,
                b: number & 255,
                a: 255
            };
        }
        if (/^#([A-Fa-f0-9]{4}){1,2}$/.test(hex)) {
            var string = hex.substring(1);
            if (string.length === 4) {
                string =
                    string[0] +
                        string[0] +
                        string[1] +
                        string[1] +
                        string[2] +
                        string[2] +
                        string[3] +
                        string[3];
            }
            var number = parseInt("0x" + string);
            return {
                r: (number >> 24) & 255,
                g: (number >> 16) & 255,
                b: (number >> 8) & 255,
                a: number & 255
            };
        }
        throw new module.exports.InputError("Unknown hex format");
    },
    hex2hsv: function (hex) {
        throw new module.exports.DormantError();
    },
    rgb2hex: function (rgb, ignoreOpacity) {
        if (ignoreOpacity === void 0) { ignoreOpacity = false; }
        return ("#" +
            module.exports.toHex(rgb.r) +
            module.exports.toHex(rgb.g) +
            module.exports.toHex(rgb.b) +
            (ignoreOpacity
                ? ""
                : module.exports.toHex(Math.floor(rgb.a || rgb.a === 0 ? rgb.a : 255))));
    },
    rgb2hsv: function (rgb, round) {
        if (round === void 0) { round = true; }
        var r = round ? Math.floor(rgb.r) : rgb.r, g = round ? Math.floor(rgb.g) : rgb.g, b = round ? Math.floor(rgb.b) : rgb.b, a = rgb.a || rgb.a === 0 ? (round ? Math.floor(rgb.a) : rgb.a) : 255, max = Math.max(r, g, b), min = Math.min(r, g, b), difference = max - min, h = 0, s = max === 0 ? 0 : difference / max, v = max / 255;
        switch (max) {
            case min:
                h = 0;
                break;
            case r:
                h = g - b + difference * (g < b ? 6 : 0);
                h /= 6 * difference;
                break;
            case g:
                h = b - r + difference * 2;
                h /= 6 * difference;
                break;
            case b:
                h = r - g + difference * 4;
                h /= 6 * difference;
                break;
        }
        h *= 360;
        s *= 100;
        v *= 100;
        a /= 2.55;
        if (!round) {
            return {
                h: h,
                s: s,
                v: v,
                a: a
            };
        }
        return {
            h: Math.round(h),
            s: Math.round(s),
            v: Math.round(v),
            a: Math.round(a)
        };
    },
    hsv2hex: function (hsv, ignoreOpacity) {
        if (ignoreOpacity === void 0) { ignoreOpacity = false; }
        return module.exports.rgb2hex(module.exports.hsv2rgb(hsv), ignoreOpacity);
    },
    hsv2rgb: function (hsv, round) {
        if (round === void 0) { round = true; }
        var h = (round ? Math.floor(hsv.h) : hsv.h) / 360, s = (round ? Math.floor(hsv.s) : hsv.s) / 100, v = (round ? Math.floor(hsv.v) : hsv.v) / 100, a = hsv.a || hsv.a === 0 ? (round ? Math.floor(hsv.a) : hsv.a) : 100, i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), r = 0, g = 0, b = 0;
        switch (i % 6) {
            case 0:
                (r = v), (g = t), (b = p);
                break;
            case 1:
                (r = q), (g = v), (b = p);
                break;
            case 2:
                (r = p), (g = v), (b = t);
                break;
            case 3:
                (r = p), (g = q), (b = v);
                break;
            case 4:
                (r = t), (g = p), (b = v);
                break;
            case 5:
                (r = v), (g = p), (b = q);
                break;
        }
        r *= 255;
        g *= 255;
        b *= 255;
        a *= 2.55;
        if (!round) {
            return {
                r: r,
                g: g,
                b: b,
                a: a
            };
        }
        return {
            r: Math.round(r),
            g: Math.round(g),
            b: Math.round(b),
            a: Math.round(a)
        };
    },
    randomHex: function (ignoreOpacity, randomOpacity) {
        if (ignoreOpacity === void 0) { ignoreOpacity = false; }
        if (randomOpacity === void 0) { randomOpacity = false; }
        return module.exports.rgb2hex({
            r: module.exports.randomInt(0, 255),
            g: module.exports.randomInt(0, 255),
            b: module.exports.randomInt(0, 255),
            a: randomOpacity ? module.exports.randomInt(0, 255) : 255
        }, ignoreOpacity);
    },
    /* Game */
    collide: {
        polygon: function (a, b) {
            throw new module.exports.DormantError();
        },
        rect2rect: function (a, b) {
            return (a.x + a.w > b.x && a.x < b.x + b.w && b.y + b.h > a.y && b.y < a.y + a.h);
        },
        rect2circle: function (a, b) {
            throw new module.exports.DormantError();
        },
        circle2circle: function (a, b) {
            return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)) < a.r + b.r;
        },
        distance: function (x1, y1, x2, y2) {
            return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        }
    },
    //? Why does this need Math.PI * 1.5 ? Switch x/y ?
    coords2angle: function (x1, y1, x2, y2) {
        return Math.PI * 1.5 + Math.atan2(x2 - x1, y1 - y2);
    },
    angle2coords: function (x, y, angle, distance) {
        return {
            x: x + distance * Math.cos(angle),
            y: y + distance * Math.sin(angle)
        };
    },
    trace: function (x, y, angle, density, maxDistance, callback) {
        throw new module.exports.DormantError();
    },
    /* Event Listener */
    keys: {},
    mouse: {},
    setMouseOffset: function (offset) {
        if (!module.exports.env.DOM()) {
            throw module.exports.EnvError("DOM");
        }
        module.exports.mouse.offsetLeft = offset.left;
        module.exports.mouse.offsetTop = offset.top;
    },
    mouseOver: function (element, ignoreOffset) {
        if (ignoreOffset === void 0) { ignoreOffset = false; }
        if (!module.exports.env.DOM()) {
            throw module.exports.EnvError("DOM");
        }
        var rect = element.getBoundingClientRect();
        return (module.exports.mouse.x > (ignoreOffset ? 0 : rect.left) &&
            module.exports.mouse.y > (ignoreOffset ? 0 : rect.top) &&
            module.exports.mouse.x < rect.width + rect.left &&
            module.exports.mouse.y < rect.height + rect.top);
    },
    createListeners: function () {
        if (!module.exports.env.DOM()) {
            throw module.exports.EnvError("DOM");
        }
        window.onkeydown = function (event) {
            module.exports.keys[event.key] = true;
            module.exports.keys[event.code] = true;
            module.exports.keys[event.keyCode] = true;
        };
        window.onkeyup = function (event) {
            delete module.exports.keys[event.key];
            delete module.exports.keys[event.code];
            delete module.exports.keys[event.keyCode];
        };
        var mouseEvents = [
            "onclick",
            "ondblclick",
            "onmousemove",
            "onmouseout",
            "onmouseover",
            "onmouseup",
        ];
        for (var i = 0; i < mouseEvents.length; i++) {
            window[mouseEvents[i]] = module.exports.setMouse;
        }
        module.exports.mouseButtons = ["left", "middle", "right", "four", "five"];
        window.onmousedown = function (event) {
            module.exports.mouse[module.exports.mouseButtons[event.button]] = true;
        };
        window.onmouseup = function (event) {
            module.exports.mouse[module.exports.mouseButtons[event.button]] = false;
        };
        addEventListener("touchstart", function (event) {
            module.exports.setMouse(event.touches[0]);
            module.exports.mouse.touchDown = true;
            module.exports.mouse.isFirstTouch = true;
        });
        addEventListener("touchmove", function (event) {
            module.exports.setMouse(event.touches[0]);
            module.exports.mouse.touchDown = true;
        });
        addEventListener("touchend", function (event) {
            module.exports.mouse.touchDown = false;
        });
    },
    parseControls: function (object) {
        throw new module.exports.DormantError();
    },
    /* HTML Document */
    setQuery: function (key, value) {
        throw new module.exports.DormantError();
    },
    setCaret: function (element, position) {
        throw new module.exports.DormantError();
    },
    getCaret: function (element) {
        throw new module.exports.DormantError();
    },
    copy: function (text) {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand("copy");
            }
            catch (err) {
                throw err;
            }
            document.body.removeChild(textArea);
            return;
        }
        navigator.clipboard.writeText(text).then(function () { }, function (err) {
            throw err;
        });
    },
    download: function (image) {
        throw new module.exports.DormantError();
    },
    /* HTML Canvas */
    fillCanvas: function (ctx) {
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    clearCanvas: function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    fillRoundRect: function (ctx, x, y, w, h, radius) {
        if (radius === void 0) { radius = Math.min(w, h) / 2; }
        if (!radius && radius !== 0) {
            radius = Math.min(w, h) / 2;
        }
        if (w < 2 * radius) {
            radius = w / 2;
        }
        if (h < 2 * radius) {
            radius = h / 2;
        }
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + w, y, x + w, y + h, radius);
        ctx.arcTo(x + w, y + h, x, y + h, radius);
        ctx.arcTo(x, y + h, x, y, radius);
        ctx.arcTo(x, y, x + w, y, radius);
        ctx.fill();
    },
    strokeRoundRect: function (ctx, x, y, w, h, radius) {
        if (radius === void 0) { radius = Math.min(w, h) / 2; }
        if (!radius && radius !== 0) {
            radius = Math.min(w, h) / 2;
        }
        if (w < 2 * radius) {
            radius = w / 2;
        }
        if (h < 2 * radius) {
            radius = h / 2;
        }
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + w, y, x + w, y + h, radius);
        ctx.arcTo(x + w, y + h, x, y + h, radius);
        ctx.arcTo(x, y + h, x, y, radius);
        ctx.arcTo(x, y, x + w, y, radius);
        ctx.stroke();
    },
    getCanvasPixel: function (canvas, x, y) {
        throw new module.exports.DormantError();
    },
    scanCanvas: function (canvas) {
        throw new module.exports.DormantError();
    }
};
