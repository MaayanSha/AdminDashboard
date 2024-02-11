import {createReducer, on} from "@ngrx/store";
import {
  addPublisher,
  addDomain,
  deleteDomain,
  errorPublishers,
  successPublishers,
  updateDomain,
  loadPublishers
} from "./publishers.actions";
import {Publisher} from "../components/publishers-container/publishers-container.component";

//define the initial state of the store
export const initialState: Publisher[] = [];
export const publishersReducer = createReducer(
  initialState,
  on(loadPublishers, (state) => state),
  on(successPublishers, (state, { data }) => data),
  on(errorPublishers, (state, { data }) => []),
  on(addPublisher, (state, { data }) => ([...state, data])),
  on(addDomain, (state, { data }) => state.map((publisher) => publisher.publisher === data.publisher ? data : publisher)),
  on(updateDomain, (state, { data }) => state.map((publisher) => publisher.publisher === data.publisher ? data : publisher)),
  on(deleteDomain, (state, { data }) => state.filter((publisher) => publisher.publisher !== data.publisher)),
)
