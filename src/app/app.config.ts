import {ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {PublishersEffects} from "./store/publishers.effects";
import {publishersReducer} from "./store/publishers.reducers";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
