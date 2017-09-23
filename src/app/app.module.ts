import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { APIModule } from './api/api.module';

// 根组件和首页组件引用
import AppComponent from './app.component';
import DashboardComponent from './dashboard.component';

import cookies from 'libs/cookies';

// Http 请求全局配置
@Injectable()
class JxbRequestOptions extends BaseRequestOptions {

    constructor() { super();
        this.headers.append('X-Access-Token', cookies.get('token'));
    }

    merge(options?: RequestOptionsArgs): RequestOptions {

        if (!options.url.match(/:\/\/|^\/\//)) {
            options.url = `//${process.env.SERVER}` + options.url;
        }
        return super.merge(options);
    }
}

// 根模块
@NgModule({
    imports: [BrowserModule, CommonModule, FormsModule, HttpModule, AppRoutingModule, APIModule],
    declarations: [AppComponent, DashboardComponent],
    bootstrap: [AppComponent],
    providers: [{ provide: RequestOptions, useClass: JxbRequestOptions }]
})
export default class AppModule { }