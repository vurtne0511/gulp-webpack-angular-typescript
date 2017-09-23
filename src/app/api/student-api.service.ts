import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

@Injectable()
export class StudentAPIService {

    constructor(private http: Http) { }

    search(params?: any) {
        return this.http.get('/student/search'.RESTful(params))
            .map(response => response.json().result as any[]);
    }
}

