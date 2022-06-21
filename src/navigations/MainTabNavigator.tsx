import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import BottomTab from "../components/BottomTab";
import AddScreen from "../screens/main/AddScreen";
import HomeScreen from "../screens/main/HomeScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import { MainTabParamList } from "./param";

const bottomTab = createBottomTabNavigator<MainTabParamList>();
const defaultScreenOption: BottomTabNavigationOptions = {
    headerShown: false,
}

const MainTabNavigator = () => {
    return (
        <bottomTab.Navigator backBehavior="history" tabBar={props => <BottomTab {...props}/>}>
            <bottomTab.Screen navigationKey='Home' name='Home' component={HomeScreen} options={defaultScreenOption}/>
            <bottomTab.Screen navigationKey='Add' name='Add' component={AddScreen} options={{
                ...defaultScreenOption,
            }}/>
            <bottomTab.Screen navigationKey='Profile' name='Profile' component={ProfileScreen} options={defaultScreenOption}/>
        </bottomTab.Navigator>
    )
}

export default MainTabNavigator;