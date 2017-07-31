import { Component } from '@angular/core';
import { MENU } from './constants/menu';

class UserInterface {
    sidebarFolded: boolean;
    navbarFolded: boolean;
    controlSidebarFolded: boolean;
    menus: Array<any>;
    targetSidebar: any;
    constructor(private brandName:string) {

    }
}

@Component({
    selector: 'app',
    templateUrl: './app/app.component.html'
})
export default class AppComponent {

    UI: UserInterface;

    constructor() {
        this.UI = new UserInterface('Angular 4');
        this.UI.menus = MENU;
        this.UI.targetSidebar = MENU[0];
    }

    changeSidebar(menu: any) {
        this.UI.targetSidebar = menu;
        this.UI.navbarFolded = menu.items.length > 0;
    }
}