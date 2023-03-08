import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddTodo, TodoItem } from '../todos.state';

@Component({
  selector: 'app-compngxs',
  templateUrl: './compngxs.component.html',
})
export class CompngxsComponent implements OnInit {
  ngOnInit() {}
  @Select('todos.dataset') todos: Observable<TodoItem[]>;

  constructor(private store: Store) {}

  SaveTodo(input) {
    console.log(input);
    this.store.dispatch(new AddTodo(input.value)).subscribe((state) => {
      console.log(state);
      input.value = '';
    });
  }
}
