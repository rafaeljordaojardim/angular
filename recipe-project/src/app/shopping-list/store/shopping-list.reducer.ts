// reducer is just a simple function

import { Ingredient } from "../../../app/shared/ingredient.model";
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  ShoppingListTypes,
  START_EDIT,
  STOP_EDIT,
  UPDATE_INGREDIENT
} from "./shopping-list.actions";

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};


export function shoppingListReducer(state = initialState, action: ShoppingListTypes) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case UPDATE_INGREDIENT:
      const updatedArray = [...state.ingredients];
      updatedArray[state.editedIngredientIndex] = {...action.payload}
      return {
        ...state,
        ingredients: updatedArray,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: [ ...state.ingredients ].splice(state.editedIngredientIndex, 1),
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };
    case STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    default:
      return state;
  }
}
