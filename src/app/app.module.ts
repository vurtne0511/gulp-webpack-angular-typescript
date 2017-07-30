import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import AppComponent from './app.component';
import ControlSidebar from './core/control-sidebar/control-sidebar';
import HeaderBar from './core/header-bar/header-bar';
import Navigator from './core/navigator/navigator';
import FrameGroup from './core/frame-group/frame-group';

require('jxbapp-admin/dist/jxbapp-admin.css');
require('jxbapp-icon/jxb-icon.css');

@NgModule({
    declarations: [AppComponent, HeaderBar, ControlSidebar, Navigator, FrameGroup],
    bootstrap: [AppComponent],
    imports: [BrowserModule]
})
export class AppModule {
    constructor() {

    }
}
