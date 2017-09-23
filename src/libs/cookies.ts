export default {
    set: function (name: string, value: any, day: any = 7) {
        let exp = new Date();
        exp.setTime(exp.getTime() + (day * 1000 * 60 * 60));
        document.cookie = `${name}=${decodeURIComponent(value)};expires=${exp.toISOString()}`;
    },
    get: function (name: string) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return encodeURIComponent(arr[2]);
        } else {
            return null;
        }
    }
};