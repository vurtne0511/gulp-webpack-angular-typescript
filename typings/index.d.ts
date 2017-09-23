
/// <reference path="./jxb.d.ts" />

// Window 类型定义
interface Window {
    opera: any;
    webkitURL: any;
    AMap: any;
}

// JQuery 自定义插件类型定义
interface JQuery {
    validate(successHandler?: Function, errorHandler?: Function): void;
    poptrox(options: any): any;
    cropper: (obj: Dictionary | string, result?: any) => JQuery | HTMLCanvasElement;
    datepicker: Function;
    magnificPopup(options: any): any;
}

// String 类原型扩展
interface String {

    // 将参数拼接入url
    RESTful(urlParams: Object): string;

    // 字符串格式化函数
    format(str: string, ...args: any[]): string;

    // 转驼峰式
    camel(): string;
}

// Number 类原型扩展
interface Number {
    padLeft(len: Number, chr: any): string;
}

interface Date {
    format(fmt: string): string;
}

// underscore 类型声明
declare const _: _.LoDashStatic;

// 定义字典类型 { key: string, value: T | any }
declare type Dictionary<T = any> = { [key: string]: T };


declare const zone: any;