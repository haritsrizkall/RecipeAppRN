import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import { AuthStackParamList } from "./param";
import { defaultScreenOption } from "./RootStackNavigator";


const Stack = createNativeStackNavigator<AuthStackParamList>();


const AuthStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={defaultScreenOption}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator;