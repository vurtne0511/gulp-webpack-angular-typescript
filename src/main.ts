import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(success => console.log(`angular 4 bootstrap success`))
    .catch(err => console.error(err));