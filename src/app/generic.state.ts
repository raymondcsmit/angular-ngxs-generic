import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap, catchError, Observable } from 'rxjs';

// #region Actions
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
// #endregion EndActions

// #region State
export interface GenericStateModel<T> {
  activeValue: T;
  listData: T[];
  loading: boolean;
  error: any;
}

export interface StateModel {
  [key: string]: GenericStateModel<any>;
}

@State<StateModel>({
  name: 'generic',
  defaults: {},
})
@Injectable()
export class GenericState {
  @Action(LoadData)
  loadData(ctx: StateContext<StateModel>, action: LoadData<any>) {
    const stateData = ctx.getState()[action.stateName] || {
      activeValue: null,
      listData: [],
      loading: false,
      error: null,
    };
    ctx.patchState({
      [action.stateName]: {
        ...stateData,
        loading: true,
      },
    });
    return action.payload.pipe(
      tap((data: any) => {
        if (Array.isArray(data)) {
          ctx.dispatch(new LoadDataSuccess(data, action.stateName));
        } else {
          ctx.dispatch(new LoadDataSuccess([data], action.stateName));
        }
      }),
      catchError((error) =>
        ctx.dispatch(new LoadDataFail(error, action.stateName))
      )
    );
  }

  @Action(LoadDataFail)
  loadDataFail(ctx: StateContext<StateModel>, action: LoadDataFail<any>) {
    const stateData = ctx.getState()[action.stateName] || {
      activeValue: null,
      listData: [],
      loading: false,
      error: null,
    };
    ctx.patchState({
      [action.stateName]: {
        ...stateData,
        error: action.payload,
        loading: false,
      },
    });
  }

  @Action(LoadDataSuccess)
  loadDataSuccess(ctx: StateContext<StateModel>, action: LoadDataSuccess<any>) {
    const stateData = ctx.getState()[action.stateName] || {
      activeValue: null,
      listData: [],
      loading: false,
      error: null,
    };
    const updatedListData = [...stateData.listData, ...action.payload];
    ctx.patchState({
      [action.stateName]: {
        ...stateData,
        activeValue: null,
        listData: updatedListData,
        loading: false,
        error: null,
      },
    });
  }

  @Action(AddData)
  addData(ctx: StateContext<any>, action: AddData<any>) {
    const stateData = ctx.getState()[action.stateName] || {
      activeValue: null,
      listData: [],
      loading: false,
      error: null,
    };
    const updatedListData = [...stateData.listData, action.payload];
    ctx.patchState({
      [action.stateName]: {
        ...stateData,
        activeValue: action.payload,
        listData: updatedListData,
        loading: false,
        error: null,
      },
    });
  }
  
}
// #endregion