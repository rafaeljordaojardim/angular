import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/store/auth.reducer';
import { ShoppingListState, shoppingListReducer } from '../shopping-list/store/shopping-list.reducer';
import { RecipesState, recipesReducer } from '../recipes/store/recipe.reducer';

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
  recipes: RecipesState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipesReducer
};
