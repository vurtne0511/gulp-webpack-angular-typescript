import 'jxbapp-admin';
import 'jxbapp-icon';
import 'less/common.less';
import 'less/index.less';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import AppModule from 'app/app.module';

import http from 'libs/http';

let baseUrl = `//${process.env.SERVER}`;

http.post(`${baseUrl}/staff/signin`, null, (e: any, result: any) => {

    if (!result) {
        location.href = './signin.html';
        return;
    }

    platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then(success => console.log(`angular 4 application bootstrap success`))
        .catch(err => console.error(err));
});