import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

export const ADDTODO = 'Add Todo';

export class AddTodo {
  static readonly type = ADDTODO;
  payload: TodoItem;
  constructor(name: string) {
    this.payload = new TodoItem(name);
  }
  //constructor(public payload: TodoItem) {}
}
export class TodoItem {
  constructor(public content: string) {}
}

export interface TodosStateModel {
  dataset: TodoItem[];
}

@Injectable() // <-- Add this decorator
@State<TodosStateModel>({
  name: 'todos',
  defaults: {
    dataset: [new TodoItem('Hello NGXS')],
  },
})
export class TodosState {
  constructor(private service: ApiService) {}
  @Action(AddTodo)
  addTodo(
    { getState, setState }: StateContext<TodosStateModel>,
    { payload }: AddTodo
  ) {
    return this.service.someApiCall().pipe(
      tap(() => {
        const state = getState();
        setState({
          ...state,
          dataset: [...state.dataset, payload],
        });
      })
    );
  }
}
