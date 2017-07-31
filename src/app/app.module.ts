import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// 根组件和首页组件引用
import AppComponent from './app.component';
import DashboardComponent from './dashboard.component';

// 路由配置
const appRoutes: Routes = [
    { path: '', component: DashboardComponent },
];

// 根模块
@NgModule({
    declarations: [AppComponent, DashboardComponent],
    bootstrap: [AppComponent],
    imports: [BrowserModule, RouterModule.forRoot(appRoutes)]
})
export class AppModule {
    constructor() {

    }
}