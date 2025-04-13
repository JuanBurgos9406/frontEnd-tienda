import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Asegúrate que esta ruta sea correcta
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));