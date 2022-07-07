export type Recipe = {
    _id: string,
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
    selectedRecipe: Recipe,
}

export enum RecipeActionType {
    GET_RECIPES = 'GET_RECIPES',
    ADD_RECIPE = 'ADD_RECIPE',
    DELETE_RECIPE = 'DELETE_RECIPE',
    UPDATE_RECIPE = 'UPDATE_RECIPE',
    SELECT_RECIPE = 'SELECT_RECIPE',
}

export type RecipeAction = {
    type: RecipeActionType,
    payload?: any
}

const initStateRecipe: StateRecipeType = {
    recipes: [],
    selectedRecipe: {
        _id: '',
        userId: '',
        name: '',
        description: '',
        ingredients: [],
        steps: [],
        createdAt: '',
        updatedAt: '',
    }
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
                recipes: state.recipes.filter(recipe => recipe._id !== action.payload)
            }
        case RecipeActionType.UPDATE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.map(recipe => recipe._id === action.payload._id ? action.payload : recipe),
                selectedRecipe: {
                    ...state.selectedRecipe,
                    ...action.payload
                }
            }
        case RecipeActionType.SELECT_RECIPE:
            return {
                ...state,
                selectedRecipe: action.payload
            }
        default:
            return state;
    }
}