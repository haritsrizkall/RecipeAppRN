import { NavigationProp } from "@react-navigation/native";
import  Axios  from "axios";
import { Dispatch } from "react";
import { showMessage } from "react-native-flash-message";
import { API_URL } from "../../config/api";
import { getData } from "../../storage";
import { Recipe } from "../reducers/recipe";
import { setIsLoading } from "./global";

export const addRecipe = (recipe: Omit<Recipe, "userId" |"createdAt" | "updatedAt" | "_id">, navigation: NavigationProp<any>, cb: any) => async (dispatch: Dispatch<any>) => {
    dispatch(setIsLoading(true));
    const token = await getData("token");
    try {
        const resp: any = await Axios.post(
            `${API_URL}/recipes`,
            recipe,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        dispatch({
            type: "ADD_RECIPE",
            payload: resp.data.data
        })
        dispatch(setIsLoading(false))
        showMessage({
            message: `Success add recipe`,
            type: 'success',
        })
        cb();
        navigation.goBack();
    }catch (err: any) {
        dispatch(setIsLoading(false))
        console.log('error', err)
        showMessage({
            message: `Adding recipe error ${err.response?.data?.message}`,
            type: 'danger',
        })
    }
}

export const updateRecipe = (recipe: Omit<Recipe, "userId" | "createdAt" | "updatedAt">, navigation: NavigationProp<any>, cb: any) =>async (dispatch:Dispatch<any>) => {
    dispatch(setIsLoading(true));
    const token = await getData("token");
    try {
        const resp: any = await Axios.put(
            `${API_URL}/recipes/${recipe._id}`,
            recipe,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },
        ) 
        dispatch({
            type: "UPDATE_RECIPE",
            payload: recipe
        })
        dispatch(setIsLoading(false))
        showMessage({
            message: `Success update recipe`,
            type: 'success',
        })
        cb();
        navigation.goBack();
    } catch (err: any) {
        dispatch(setIsLoading(false))
        console.log('error', err)
        showMessage({
            message: `Updating recipe error ${err.response?.data?.message}`,
            type: 'danger',
        })
    }
}
export const selectRecipe = (recipe: any) => {
    return {
        type: "SELECT_RECIPE",
        payload: recipe
    }
}
export const fetchRecipes = () => async (dispatch: Dispatch<any>) => {
    dispatch(setIsLoading(true))
    try {
        const token = await getData("token");
        const resp: any = await Axios.get(`${API_URL}/recipes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({
            type: "GET_RECIPES",
            payload: resp.data.data
        })
        dispatch(setIsLoading(false))
        showMessage({
            message: `Success fetch transaction`,
            type: 'success',
        })
    } catch (err) {
        dispatch(setIsLoading(false))
        console.log('error', err)
        showMessage({
            message: `Fetch transaction error: ${err.response?.data?.message}`,
            type: 'danger',
        })
    }
}

export const cogserv = async (photo: any) => {
    try {
        const token = await getData("token");
        const resp:any = await Axios.post(`${API_URL}/cogserv`, photo, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        })
        if (resp.data.data == "No Recognized Text") {
            showMessage({
                message: `No Recognized Text`,
                type: 'danger',
            })
        }
        console.log(resp.data.data)
        return resp.data.data
    }catch(err) {
        console.log(err)
        showMessage({
            message: `OCR error`,
            color: 'danger',
        })
    }
}

export const deleteRecipe = (id: string, cb?: any) => async (dispatch: Dispatch<any>) => {
    dispatch(setIsLoading(true))
    try {
        const token = await getData("token");
        const resp: any = await Axios.delete(`${API_URL}/recipes/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        dispatch({
            type: "DELETE_RECIPE",
            payload: id
        })
        dispatch(setIsLoading(false))
        showMessage({
            message: `Success delete recipe`,
            type: 'success',
        })
        if (cb !== undefined) {
            cb();
        }
    } catch (error) {
        console.log(error)
        dispatch(setIsLoading(false))
        showMessage({
            message: `Delete recipe error: ${error.response?.data?.message}`,
            type: 'danger',
        })
    }
}