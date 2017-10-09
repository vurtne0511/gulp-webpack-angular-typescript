import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import menus from 'app/constants/menu';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

class UserInterface {
    constructor(
        private brandName: string,
        public sidebarFolded = false,
        public navbarFolded = false,
        public controlSidebarFolded = false,
        public navbarToggleVisible = false,
        public menus: Array<any> = null,
        public targetSidebar: any = null
    ) { }
}
@Component({
    selector: 'app',
    templateUrl: './app/app.component.html'
})
export default class AppComponent implements OnInit {

    UI: UserInterface = new UserInterface('大赛');

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute) {

        this.UI.menus = menus;
        this.UI.targetSidebar = menus[0];
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .filter(event => {
                console.log(event);
                return ['primary', 'sub', 'sub2'].indexOf(event.outlet) > -1;
            })
            .subscribe(event => {
                console.log(event.firstChild.outlet);
            });
    }

    public changeSidebar(menu: any) {
        if (menu.hasOwnProperty('url')) {
            this.router.navigate([menu.url]);
        }
        this.UI.targetSidebar = menu;
        this.UI.navbarToggleVisible = this.UI.navbarFolded = menu.items.length > 0;
    }

    private getRootRouter(route: ActivatedRoute) {
        // this.router
        // let views = $stateObject.views || {};
        // if (views.hasOwnProperty('@') ||
        //     views.hasOwnProperty('sub@') ||
        //     views.hasOwnProperty('sub2@')) {
        //     return $stateObject;
        // }
        // return $stateObject.parent && this.getRootState($stateObject.parent) || $stateObject;
    }

    public ngOnInit() {

    }
}