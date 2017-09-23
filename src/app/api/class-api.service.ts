import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ClassAPIService {

    constructor(private http: Http) { }

    search(params?: any): Promise<any[]> {
        return this.http.get('/class/term/search'.RESTful(params))
            .toPromise()
            .then(response => response.json().data as any[])
            .catch();
    }

    detail(id: string): Promise<any> {
        return this.http.get(`/class/term/term_id/${id}`)
            .toPromise()
            .then(response => response.json().data)
            .catch();
    }
}