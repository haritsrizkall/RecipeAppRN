import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import React from 'react';
import App from '../App';
import RootStackNavigator from './RootStackNavigator';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Loading from '../components/Loading';

const NavigationContainer = () => {
    return (
        <RNNavigationContainer>
            <Provider store={store}>
                <RootStackNavigator/>
                <FlashMessage position='top'/>
                <Loading/>
            </Provider>
        </RNNavigationContainer>
    )
}

export default NavigationContainer;