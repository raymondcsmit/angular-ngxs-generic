import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { delay, Observable, of } from 'rxjs';
import { AddData, LoadData } from '../generic-ngxs';
import { Student } from './test.model';

@Component({
  selector: 'app-generic',
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
export class CompgenericngxsComponent implements OnInit {
  @Select((state) => state.generic.studentState.listData)
  data$: Observable<Student[]>;

  @Select((state) => state.generic.studentState.loading)
  loading$: Observable<boolean>;

  @Select((state) => state.generic.studentState.error)
  error$: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      new LoadData<Student[]>(this.loadData(), 'studentState')
    );
  }

  loadData(): Observable<Student[]> {
    const students: Student[] = [
      { name: 'John Doe', description: 'Mathematics' },
      { name: 'Jane Smith', description: 'Physics' },
      { name: 'Mike Johnson', description: 'Chemistry' },
    ];
    return of(students).pipe(delay(1000));
  }

  addData() {
    const data: Student = { name: 'Waqar', description: 'Software Engineer' };
    this.store.dispatch(new AddData<Student>(data, 'studentState'));
  }
}
