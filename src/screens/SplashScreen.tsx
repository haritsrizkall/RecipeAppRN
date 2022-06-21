import { NavigationProp } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { LogoFull } from '../assets'
import { getData } from '../storage'

interface IProps {
    navigation: any
}

const SplashScreen = ({navigation}: IProps) => {
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            getData('token').then(token => {
                if (token) {
                    console.log(token)
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Main'}]
                  })
                }else {
                    navigation.replace('Auth')
                }
              }) 
        }, 2000);
    }, [])
    return (
        <View style={styles.container}>
            <Image source={LogoFull} style={{
                width: 350,
                height: 350,
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor:"white"
    }
})
export default SplashScreen