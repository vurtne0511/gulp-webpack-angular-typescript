import { Component } from '@angular/core';

@Component({
    selector: 'header-bar',
    templateUrl: './app/core/header-bar/header-bar.html'
})
export default class HeaderBar {

    brandName = 'Angular 4';
    constructor() {

    }
}