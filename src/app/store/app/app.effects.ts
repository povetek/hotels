import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects';

@Injectable()
export class AppEffects {
  // constructor(
  //   private readonly actions$: Actions,
  //   private readonly store: Store,
  //   private readonly themeService: ThemeService,
  //   private readonly languageService: LanguageService,
  // ) {}

  // ngrxOnInitEffects(): Action {
  //   return AppActions.Initialize();
  // }
  //
  // initialize$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AppActions.Initialize),
  //     concatLatestFrom(() => [
  //       this.store.select(AppSelectors.selectThemeKey),
  //       this.store.select(AppSelectors.selectLanguageKey),
  //     ]),
  //     map(([, themeKey, languageKey]) => {
  //       this.store.dispatch(AppActions.ChangeThemeKey({ payload: themeKey }));
  //       this.store.dispatch(AppActions.ChangeLanguageKey({ payload: languageKey }));
  //       return AppActions.InitializeSuccess();
  //     }),
  //   ),
  // );

  // changeThemeKey$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AppActions.ChangeThemeKey),
  //     map(({ payload }) => {
  //       this.themeService.destroyChangeThemeListener(this.changeThemeListener);
  //
  //       if (payload === ThemeKey.System) {
  //         this.themeService.initChangeThemeListener(this.changeThemeListener);
  //       }
  //
  //       const theme = this.themeService.getThemeByKey(payload);
  //       return AppActions.ChangeTheme({ payload: theme });
  //     }),
  //   ),
  // );
  //
  // // prettier-ignore
  // changeTheme$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AppActions.ChangeTheme),
  //     tap(({ payload }) => {
  //       if (this.themeService.isThemeSupported(payload)) {
  //         this.themeService.applyTheme(payload);
  //       } else {
  //         this.store.dispatch(AppActions.ChangeThemeKey({ payload: ThemeKey.System }));
  //         this.store.dispatch(
  //           ModalsActions.OpenDefaultNotification({
  //             payload: { text: 'WARNINGS.THEME_NOT_SUPPORTED', translateParams: { theme: payload }, type: 'error' }
  //           }),
  //         );
  //       }
  //     }),
  //   ),
  //   { dispatch: false },
  // );
}
