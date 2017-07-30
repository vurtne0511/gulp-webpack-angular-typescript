import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <div class="wrapper">
            <header-bar></header-bar>
            <navigator></navigator>
            <frame-group></frame-group>
            <control-sidebar></control-sidebar>
        </div>
    `
})
export default class AppComponent {
    constructor() {

    }
}