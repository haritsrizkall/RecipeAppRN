export type Recipe = {
    id: string,
    userId: string,
    name: string,
    description: string,
    ingredients: string[],
    steps: string[],
    createdAt: string,
    updatedAt: string,
}

type StateRecipeType = {
    recipes: Recipe[],
}

export enum RecipeActionType {
    GET_RECIPES = 'GET_RECIPES',
    ADD_RECIPE = 'ADD_RECIPE',
    DELETE_RECIPE = 'DELETE_RECIPE',
    UPDATE_RECIPE = 'UPDATE_RECIPE',
}

export type RecipeAction = {
    type: RecipeActionType,
    payload?: any
}

const initStateRecipe: StateRecipeType = {
    recipes: [],
}

export const recipeReducer = (state: StateRecipeType = initStateRecipe, action: RecipeAction): StateRecipeType => {
    switch (action.type) {
        case RecipeActionType.GET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case RecipeActionType.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipeActionType.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe.id !== action.payload)
            }
        case RecipeActionType.UPDATE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.map(recipe => recipe.id === action.payload.id ? action.payload : recipe)
            }
        default:
            return state;
    }
}