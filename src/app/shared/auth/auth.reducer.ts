import { LoggedUser } from "src/app/interfaces/user.interface";
import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./auth.actions";
import { Action } from "@ngrx/store";

export interface State {
  isAuthenticated: boolean;
  loggedUser: LoggedUser | null;
}

const initialState: State = {
  isAuthenticated: false,
  loggedUser: null
}

export function authReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true } 
    case SET_UNAUTHENTICATED:
      return { ...state, isAuthenticated: false } 
    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;