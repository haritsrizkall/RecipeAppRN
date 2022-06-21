export type User = {
    id: string,
    name: string,
    email: string,
}

type StateAuthType = {
    user: User
}

export enum AuthActionType {
    LOGIN = 'LOGIN',
    CLEAR = 'CLEAR',
    SET_USER = 'SET_USER',
}

export type AuthAction = {
    type: AuthActionType,
    payload?: any
}

const initStateAuth: StateAuthType = {
    user: {
        id: '',
        name: '',
        email: '',
    }
}

export const authReducer = (state: StateAuthType = initStateAuth, action: AuthAction): StateAuthType => {
    switch (action.type) {
        case AuthActionType.LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case AuthActionType.CLEAR:
            return {
                ...initStateAuth
            }
        case AuthActionType.SET_USER:
            return  {
                ...state,
                user: action.payload
            }
        default:
            return state;
            break;
    }
}