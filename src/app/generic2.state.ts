import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap, catchError, Observable } from 'rxjs';

//Actions
export class LoadData<T> {
  static readonly type = '[Generic] Load Data';
  constructor(public payload: Observable<T>, public stateName: string) {}
}

export class LoadDataSuccess<T> {
  static readonly type = '[Generic] Load Data Success';
  constructor(public payload: T, public stateName: string) {}
}

export class LoadDataFail<T> {
  static readonly type = '[Generic] Load Data Fail';
  constructor(public payload: any, public stateName: string) {}
}

export class AddData<T> {
  static readonly type = '[Generic] Add Data';
  constructor(public payload: T, public stateName: string) {}
}

//EndActions

//State
export interface GenericStateModel<T> {
  activeValue: T;
  listData: T[];
  loading: boolean;
  error: any;
}

@State<GenericStateModel<any>>({
  name: 'genericState', // give the state a name
  defaults: {
    activeValue: null,
    listData: [],
    loading: false,
    error: null,
  },
})
@Injectable()
export class GenericState<T> {
  @Action(LoadData)
  loadData<T>(
    ctx: StateContext<GenericStateModel<T>>,
    action: LoadData<T>
  ) {

    const state = ctx.getState();
    if (state[action.stateName]) {
      const stateData = state[action.stateName];
      const listData = stateData.listData || [];
      ctx.patchState({
        [action.stateName]: {
          ...stateData,
          loading: true
        },
      });
    //ctx.patchState({ loading: true });
    return action.payload.pipe(
      tap((data: T | T[]) => {
        if (Array.isArray(data)) {
          ctx.dispatch(
            new LoadDataSuccess<T[]>(data, action.stateName)
          );
        } else {
          ctx.dispatch(new LoadDataSuccess<T>(data, action.stateName));
        }
      }),
      catchError((error) =>
        ctx.dispatch(new LoadDataFail<T>(error, action.stateName))
      )
    );
    }
  }

  @Action(LoadDataFail)
  loadDataFail<T>(
    ctx: StateContext<GenericStateModel<T>>,
    action: LoadDataFail<T>
  ) {
    const state = ctx.getState();
    if (state[action.stateName]) {
      const stateData = state[action.stateName];
      ctx.patchState({
        [action.stateName]: {
          ...stateData,
          error: action.payload,
          loading: false,
        },
      });
    }
  }

  @Action(LoadDataSuccess)
  loadDataSuccess<T>(
    ctx: StateContext<GenericStateModel<T>>,
    action: LoadDataSuccess<T>
  ) {
    const state = ctx.getState();
    const listData = state.listData || [];
    if (state[action.stateName]) {
      const stateData = state[action.stateName];
      const listData = stateData.listData || [];
    if (Array.isArray(action.payload)) {
      const updatedListData = listData.concat(action.payload);
      ctx.patchState({
        [action.stateName]: {
          ...stateData,
          activeValue: null,
          listData: updatedListData,
          loading: false,
          error: null,
        },
      });
    } else {
      ctx.patchState({
        [action.stateName]: {
          ...stateData,
          activeValue: null,
          listData: [...listData, action.payload],
          loading: false,
          error: null,
        },
      });
    }
  }
  }

  @Action(AddData)
  addData<T>(ctx: StateContext<GenericStateModel<T>>, action: AddData<T>) {

    //console.log('before state change',action);
    const state = ctx.getState();
    const listData = state.listData || [];
    if (state[action.stateName]) {
      const stateData = state[action.stateName];
      const listData = stateData.listData || [];

    const updatedListData = listData.concat(action.payload);
    ctx.patchState({
      [action.stateName]: {
        ...stateData,
        activeValue: action.payload,
        listData: updatedListData,
        loading: false,
        error: null,
      },
    });
    console.log('after state change', ctx.getState());
    }
  }

}
  