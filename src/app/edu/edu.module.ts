import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClassListComponent } from './class/list.component';
import { ClassDetailComponent } from './class/detail.component';
import { StudentListComponent } from './student/list.component';
import { StudentDetailComponent } from './student/detail.component';

import { Http } from '@angular/http';
import { StudentAPIService } from 'app/api/student-api.service';

const eduRoutes: Routes = [
    { path: 'edu/class', component: ClassListComponent },
    { path: 'edu/class/:id', component: ClassDetailComponent, outlet: 'sub' },
    { path: 'edu/student', component: StudentListComponent },
    { path: 'edu/student/:id', component: StudentDetailComponent },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(eduRoutes), FormsModule],
    exports: [RouterModule],
    declarations: [ClassListComponent, ClassDetailComponent, StudentListComponent, StudentDetailComponent],
    providers: [StudentAPIService]
})
export class EduModule { }