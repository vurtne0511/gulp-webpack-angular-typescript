import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'student-detail',
    templateUrl: './app/edu/student/detail.component.html'
})
export class StudentDetailComponent implements OnInit {

    id: string;

    constructor(private route: ActivatedRoute) {
        console.log(route);
    }

    ngOnInit(): void {
        this.route.params
            .map((params: Params) => params['id'])
            .subscribe((id: string) => this.id = id);
    }
}