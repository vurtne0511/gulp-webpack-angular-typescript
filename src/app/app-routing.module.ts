import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EduModule } from './edu/edu.module';

// 根组件和首页组件引用
import AppComponent from './app.component';
import DashboardComponent from './dashboard.component';

// 路由配置
const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'edu', redirectTo: 'edu/class' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true }), EduModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }