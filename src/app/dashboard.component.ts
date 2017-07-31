import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard.component.html'
})
export default class DashboardComponent implements OnInit {

    title: string;

    constructor() { }

    ngOnInit() {
        this.title = '首页';
    }
}