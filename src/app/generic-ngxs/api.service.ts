import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://api.example.com/';

  constructor(private readonly http: HttpClient) {}

  public get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`).pipe(
      map((response: T) => response)
    );
  }

  public getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${endpoint}`).pipe(
      map((response: T[]) => response)
    );
  }

  public post<T>(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data).pipe(
      map((response: T) => response)
    );
  }

  public put<T>(endpoint: string, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data).pipe(
      map((response: T) => response)
    );
  }

  public delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`).pipe(
      map((response: T) => response)
    );
  }
  someApiCall() {
    return of([]).pipe(tap(() => console.log('log from service')));
  }
}
