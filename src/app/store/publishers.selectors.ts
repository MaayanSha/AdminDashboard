import { createSelector } from '@ngrx/store';
import {Publisher} from "../components/publishers-container/publishers-container.component";

export interface PublisherState {
  Publishers: Publisher[];
}

export interface AppState {
  publishers: PublisherState;
}

export const selectPublishers = (state: AppState) => state.publishers;

export const selectPublishersList = createSelector(
  selectPublishers,
  (state: PublisherState) => state.Publishers
);
