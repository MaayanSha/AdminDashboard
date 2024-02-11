import {Domain, Publisher} from "../components/publishers-container/publishers-container.component";
import {createAction, createActionGroup, props} from "@ngrx/store";

//define CRUD actions for the store

export const loadPublishers = createAction('Load Publishers');
export const successPublishers = createAction('Retrieved Publishers', props<{ data: Publisher[] }>());
export const errorPublishers = createAction('Error Loading Publishers', props<{ data: string }>());
export const addPublisher = createAction('Add Publisher', props<{ data: Publisher }>());
export const addDomain = createAction('Add Domain', props<{ data: Publisher }>());
export const updateDomain = createAction('Update Domain', props<{ data: Publisher }>());
export const deleteDomain = createAction('Delete Domain', props<{ data: Publisher }>());




