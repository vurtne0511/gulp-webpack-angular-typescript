import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard.component.html',
    styles: [require('./dashboard.component.less')]
})
export default class DashboardComponent implements OnInit {

    title: string = '首页';

    constructor() { }

    ngOnInit() {

    }
}