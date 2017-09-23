import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ClassAPIService } from 'app/api/class-api.service';
import { StudentAPIService } from 'app/api/student-api.service';

@NgModule({
    imports: [CommonModule, HttpModule],
    providers: [StudentAPIService, ClassAPIService]
})
export class APIModule { }
