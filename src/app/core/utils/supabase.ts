import { map, Observable, BehaviorSubject, finalize, tap, of, switchMap } from 'rxjs';

type Response = {
  data?: any;
  error: any;
};

export function supabaseDataAdapter() {
  return function (source: Observable<Response>): Observable<Response['data']> {
    return source.pipe(
      map((response) => {
        if (response?.error) {
          throw response.error;
        }

        return response?.data;
      }),
    );
  };
}

export function withLoading<T>(loading$: BehaviorSubject<boolean>): (source: Observable<T>) => Observable<T> {
  return function (source: Observable<T>): Observable<T> {
    return source.pipe(
      prepare(() => loading$.next(true)),
      finalize(() => loading$.next(false)),
    );
  };
}

export function prepare<T>(callback: () => void) {
  return (source: Observable<T>) =>
    of({}).pipe(
      tap(callback),
      switchMap(() => source),
    );
}
