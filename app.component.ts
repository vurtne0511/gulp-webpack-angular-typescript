import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styles: [`
      h1 {
        padding:5px 10px;
        color:blue;
      }
  `]
})
export class AppComponent {
  name = 'Angular 4';
}