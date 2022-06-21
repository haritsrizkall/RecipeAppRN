type StateGlobalType = {
    addMode: boolean,
    isLoading: boolean
}

export enum GlobalActionType  {
    SET_ADD_MODE = 'SET_ADD_MODE',
    SET_IS_LOADING = 'SET_IS_LOADING'
}

export type GlobalAction = {
    type: GlobalActionType
    payload: any
}

const initStateGlobal: StateGlobalType = {
    addMode: false,
    isLoading: false
}


export const globalReducer = (state: StateGlobalType = initStateGlobal, action: GlobalAction):StateGlobalType  => {
    switch (action.type) {
        case GlobalActionType.SET_ADD_MODE:
            return {
                ...state,
                addMode: action.payload
            }
            break;
        case GlobalActionType.SET_IS_LOADING: 
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state;
            break;
    }
}
