import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    importProvidersFrom(MatSidenavModule, MatListModule),
    provideHttpClient()
  ],

};
