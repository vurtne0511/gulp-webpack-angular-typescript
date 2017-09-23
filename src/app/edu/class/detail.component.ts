import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'class-detail',
    templateUrl: './app/edu/class/detail.component.html'
})
export class ClassDetailComponent implements OnInit {

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => {
                console.log(params['id']);
                return null;
            });
    }
}