import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Student } from '../compgenericngxs/test.model';
import { AddData, GenericStateModel, LoadData } from '../generic.state';

@Component({
  selector: 'app-secondngxs',
  template: `
  <div *ngIf="loading$ | async">Loading...</div>
    <div *ngIf="error$"></div>
    <ul>
      <li *ngFor="let item of data$ | async">
        {{ item.name }} - {{ item.description }}
      </li>
    </ul>
    <button (click)="addData()">Add Generic Data</button>
  `,
})
export class SecondngxsComponent implements OnInit {
  @Select((state) => state.generic.GenState.listData)
  data$: Observable<Student[]>;

  @Select((state) => state.generic.GenState.loading)
  loading$: Observable<boolean>;

  @Select((state) => state.generic.GenState.error)
  error$: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadData<Student[]>(this.loadData(), 'GenState'));    
  }

  loadData(): Observable<Student[]> {
    const students: Student[] = [
      { name: 'John Doe 1', description: 'Mathematics' },
      { name: 'Jane Smith 1', description: 'Physics' },
      { name: 'Mike Johnson 1', description: 'Chemistry' },
    ];
    return of(students).pipe(delay(1000));
  }

  addData() {
    const data: Student = { name: 'Waqar 1', description: 'Software Engineer' };
    this.store.dispatch(new AddData<Student>(data, 'GenState'));
  }
}
