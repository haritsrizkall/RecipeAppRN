import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/auth/LoginScreen";
import DetailScreen from "../screens/main/DetailScreen";
import EditScreen from "../screens/main/EditScreen";
import MainScreen from "../screens/main/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import AuthStackNavigator from "./AuthStackNavigator";
import MainTabNavigator from "./MainTabNavigator";
import { RootStackParamList } from "./param";



const Stack = createNativeStackNavigator<RootStackParamList>();
export const defaultScreenOption: NativeStackNavigationOptions = {
    headerShown: false
}

const RootStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={defaultScreenOption}>
            <Stack.Screen name="SplashScreen" component={SplashScreen}/>
            <Stack.Screen name="Auth" component={AuthStackNavigator} />
            <Stack.Screen name="Main" component={MainTabNavigator}/>
            <Stack.Screen name="Detail" component={DetailScreen}/>
            <Stack.Screen name="Edit" component={EditScreen}/>
        </Stack.Navigator>
    )
}

export default RootStackNavigator;