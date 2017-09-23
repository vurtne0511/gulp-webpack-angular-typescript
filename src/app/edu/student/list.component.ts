import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentAPIService } from 'app/api/student-api.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'student-list',
    templateUrl: './app/edu/student/list.component.html'
})
export class StudentListComponent implements OnInit, OnDestroy {

    private students: Observable<any[]>;

    private searchParams: any = {
        keyword: '',
        limit: 20,
        skip: 0
    };

    private searchTerms = new Subject<any>();

    constructor(private studentAPI: StudentAPIService) { }

    ngOnInit(): void {

        this.students = this.searchTerms
            .distinctUntilChanged(null, term => JSON.stringify(term))
            .switchMap(term => this.studentAPI.search(term));

        setTimeout(() => this.search(), 0);
    }

    search() {
        this.searchTerms.next(this.searchParams);
    }

    ngOnDestroy() {
        console.log('StudentListComponent', 'onDestroy');
    }
}