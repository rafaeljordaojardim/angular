import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { SetRecipes } from '../recipes/store/recipe.actions';
@Injectable({ providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-complete-guide-38e33.firebaseio.com/posts/recipes.json')
      .pipe(
        map(recipes => {
          if (!recipes) {
            return;
          }
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          });
        }),
        tap(recipes => {
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new SetRecipes(recipes));
        }));
  }
}
