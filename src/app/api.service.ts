import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  someApiCall() {
    return of([]).pipe(tap(() => console.log('log from service')));
  }
}
