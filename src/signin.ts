/**
 * 登陆业务
 */
import 'jxbapp-admin';
import 'jxbapp-icon';
import 'less/common.less';
import 'less/signin.less';

import 'libs/prototype';
import 'libs/validate';

import browserdetect from 'libs/browserdetect';

import http from 'libs/http';
import cookies from 'libs/cookies';
import notify from 'libs/notify';

let baseUrl = `//${process.env.SERVER}`;

if (process.env.ENV === 'production' && location.protocol === 'http:') {
    location.protocol = 'https:';
}

// 取得图形验证码相关面板
let captchaPanel = $('#captchaPanel');
let verifyCodeHash = $('#verifyCodeHash');
let captchaInput = $('#verifyCode');
let captcha = $('#captcha');

/**
 * 刷新图形验证码。
 */
function refreshCaptcha() {

    http.get(`${baseUrl}/captcha/refresh`, (e: any, data: any) => {

        if (e || !data) {
            captchaInput.removeAttr('data-validate');
            return;
        }

        captchaPanel.css('display', 'block');

        captchaInput.attr('data-field', '验证码');
        captchaInput.attr('data-validate', 'empty');
        verifyCodeHash.val(data.hash);
        captcha.attr({ src: data.data });
    });
}

captcha.click(refreshCaptcha);

captcha.trigger('click');

// 登录提交
$('form').on('submit', function () {

    let loginData: any = {
        username: $('#username').val(),
        password: $('#password').val()
    };

    if (captchaPanel.css('display') === 'block') {
        loginData.verifyCode = captchaInput.val();
        loginData.verifyCodeHash = verifyCodeHash.val();
    }

    // 验证
    $(this).validate(() => {

        let button = $(this).find('button[type="submit"]');
        button.html('登录中');
        button.attr('disabled', 'disabled');

        http.post(`${baseUrl}/staff/signin`, loginData, (e: any, data: any) => {

            button.html('登录');
            button.removeAttr('disabled');

            if (e || !data) {
                notify.error(e.error.message || "登录失败，出现异常");
                captcha.trigger('click');
                return;
            }

            cookies.set('token', data.token);

            notify.success('登录成功!');

            // 提示登录成功信息并跳转到首页
            window.location.href = './';
        });
    });

    return false;
});