import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

  ingridientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ];

  getIngridient(index: number) {
    return {...this.ingredients[index]};
  }

  getIngridients() {
    return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingridientsChanged.next([...this.ingredients]);
  }

  addIngridients(ingredients: Ingredient[]) {
    // ingredients.forEach((ingredient) => {
    //   this.addIngredient(ingredient)
    // })
    this.ingredients.push(...ingredients);
    this.ingridientsChanged.next([...this.ingredients]);
  }

  deleteItem(index: number) {
    this.ingredients.splice(index, 1);
    this.ingridientsChanged.next([...this.ingredients]);
  }

  updatemIndredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = {...newIngredient};
    this.ingridientsChanged.next(this.ingredients.slice());
  }
}
