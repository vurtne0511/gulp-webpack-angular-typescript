import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'class-list',
    templateUrl: './app/edu/class/list.component.html'
})
export class ClassListComponent implements OnInit {
    constructor(private http: Http) { }

    ngOnInit() {
    }
}