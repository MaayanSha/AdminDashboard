import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadPublishers, successPublishers, addPublisher, addDomain, errorPublishers, deleteDomain, updateDomain} from "./publishers.actions";
import {mergeMappings} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file";
import {catchError, exhaustMap, map, mergeMap, of} from "rxjs";
import {Publisher} from "../components/publishers-container/publishers-container.component";
import {PublishersService} from "./publishers.services";

@Injectable()
export class PublishersEffects {
  constructor(private actions: Actions, private dataService: PublishersService) {
  }

  loadPublishers = createEffect(() =>
    this.actions.pipe(
      ofType(loadPublishers),
      exhaustMap(() => {
        return this.dataService.getPublishers().pipe(
          map((publishers: Publisher[]) => successPublishers({data: publishers})),
          catchError((error) => of(errorPublishers({data: error})))
        )
      }))
  )
}
