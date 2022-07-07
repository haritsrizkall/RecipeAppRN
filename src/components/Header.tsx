import { StyleSheet, Text, View, TouchableOpacity, Image, ViewStyle } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { GlobalActionType } from '../redux/reducers/global'
import { Back } from '../assets'
import { setAddMode } from '../redux/actions'


type Props = {
    text: string,
    backStyle?: ViewStyle,
}

const Header = ({text, backStyle}: Props) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <View style={styles.header}>
            <View style={styles.back}>
                <TouchableOpacity style={{
                    ...styles.imageContainer,
                    ...backStyle,
                }} activeOpacity={0.6} onPress={() => {
                    navigation.goBack()
                    dispatch(setAddMode(false))
                }}>
                    <Image source={Back} style={styles.backImage}/>
                </TouchableOpacity>
            </View>
            <View style={styles.headerTitle}>
                <Text style={styles.titleText}>{text}</Text>
            </View>
        </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 15,
        paddingVertical: 20,
    },
    headerTitle: {
        marginLeft: 20 
    },
    titleText: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: 'black'
    },
    back: {
    },
    backImage: {
        width: 11,
        height: 22,
    },
    imageContainer:{
        backgroundColor: 'white',
        width: 30,
        height: 30,
        alignItems: 'center',
    },
    buttonContainer: {
        flex:1,
        justifyContent: 'flex-end',
        marginBottom: 20,
    }
})