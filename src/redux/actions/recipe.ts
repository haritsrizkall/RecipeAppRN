import { NavigationProp } from "@react-navigation/native";
import  Axios  from "axios";
import { Dispatch } from "react";
import { showMessage } from "react-native-flash-message";
import { API_URL } from "../../config/api";
import { getData } from "../../storage";
import { Recipe } from "../reducers/recipe";
import { setIsLoading } from "./global";

export const addRecipe = (recipe: Omit<Recipe, "userId" |"createdAt" | "updatedAt" | "id">, navigation: NavigationProp<any>, cb: any) => async (dispatch: Dispatch<any>) => {
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
        console.log(resp.data)
        showMessage({
            message: `Success add transaction`,
            type: 'success',
        })
        cb();
        navigation.goBack();
    }catch (err: any) {
        dispatch(setIsLoading(false))
        console.log('error', err)
        showMessage({
            message: `Adding transaction error ${err.response?.data?.message}`,
            type: 'danger',
        })
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
        console.log(resp.data.data)
        return resp.data.data
    }catch(err) {
        console.log(err)
    }
}

export const deleteRecipe = (id: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setIsLoading(false))
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

    } catch (error) {
        console.log(error)
        dispatch(setIsLoading(false))
        showMessage({
            message: `Delete recipe error: ${error.response?.data?.message}`,
            type: 'danger',
        })
    }
}