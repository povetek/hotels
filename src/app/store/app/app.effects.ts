import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HomepageService } from '@core/services/homepage.service';
import { AppActions } from '@store/app/app.actions';
import { concatMap, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly homepageService: HomepageService,
  ) {}

  ngrxOnInitEffects(): Action {
    return AppActions.Initialize();
  }

  initialize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.Initialize),
      concatMap(() => this.homepageService.getHomepage(environment.hotelId)),
      map((homepage) => AppActions.SetHomepage({ payload: homepage })),
    ),
  );
}
