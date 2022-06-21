import { GlobalActionType, GlobalAction } from "../reducers/global"

export const setAddMode = (addMode: boolean): GlobalAction => {
    return {
        type: GlobalActionType.SET_ADD_MODE,
        payload: addMode
    }
}

export const setIsLoading = (isLoading: boolean): GlobalAction => {
    return {
        type: GlobalActionType.SET_IS_LOADING,
        payload: isLoading
    }
}