import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationProp } from "@react-navigation/native"
import  Axios, { AxiosError, AxiosResponse }  from "axios"
import { showMessage } from "react-native-flash-message"
import { Dispatch } from "redux"
import { API_URL } from "../../config/api"
import { storeData } from "../../storage"
import { AuthActionType } from "../reducers/auth"
import { setIsLoading } from "./global"

type SignUpActionParam = {
    name: string,
    email: string,
    password: string,
    navigation: NavigationProp<any>
}

export const signUp = ({name, email, password, navigation}: SignUpActionParam) => (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    Axios.post(`${API_URL}/auth/register`, {
        name,
        email, 
        password
    }).then((resp: AxiosResponse) => {
        console.log(resp.data)
        showMessage({
            message: "Signing up success",
            type: 'success',
            duration: 1000
        })
        dispatch(setIsLoading(false))
        navigation.navigate('Login')
    }).catch((err: AxiosError) => {
        console.log(err)
        showMessage({
            message: "Signing up error",
            type: 'danger',
            duration: 1000
        })
        dispatch(setIsLoading(false))
    })
} 

type SignInActionParam = {
    email: string,
    password: string,
    navigation: NavigationProp<any>
}

export const signIn = ({email, password, navigation}: SignInActionParam) => (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    Axios.post(`${API_URL}/auth/login`, {
        email,
        password
    }).then((resp: AxiosResponse) => {
        dispatch(setIsLoading(false))
        storeData('token', resp.data.data.token)
        storeData('user', resp.data.data)
        navigation.reset({
            index: 0,
            routes: [{name: 'Main'}]
        })
    }).catch((err: any) => {
        showMessage({
            message: `Signing in error : ${err.response?.data.message}`,
            type: 'danger',
            duration: 1000
        })
        dispatch(setIsLoading(false))
    })
}

export const clearState = () => {
    return {
        type: AuthActionType.CLEAR
    }
}


export const signOut = ({navigation}: {navigation: NavigationProp<any>}) => (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    AsyncStorage.multiRemove(['token'])
        .then(() => {
            dispatch(setIsLoading(false))
            dispatch(clearState())
            navigation.reset({
                index: 0,
                routes: [{name: 'Auth'}]
              })
        }).catch((err: Error) => {
            dispatch(setIsLoading(false))
            console.log(err)
        })
}