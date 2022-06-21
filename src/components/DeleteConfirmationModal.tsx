import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ReactNativeModal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../redux/store'
import { GlobalActionType } from '../redux/reducers/global'
import { useNavigation } from '@react-navigation/native'
import { setAddMode } from '../redux/actions'
import Button from './Button'
import { DeleteIcon } from '../assets'

type Props = {
    isVisible: boolean
    onClose : () => void
    onDelete : () => void
}
const DeleteConfirmationModal = ({isVisible, onClose, onDelete}: Props) => {
const nav = useNavigation()
const globalState = useSelector((state: RootStore) => state.globalReducer)
const dispatch = useDispatch()
  return (
    <ReactNativeModal 
        isVisible={isVisible} 
        style={styles.modal}
        onBackdropPress={onClose}
    >
        <View style={styles.container}>
            <Image
                source={DeleteIcon}
                style={{width: 100, height: 100, marginVertical: 20}}
            />
            <View>
                <Text style={styles.textBold}>Are you sure?</Text>
                <Text style={styles.text}>Do you really want to delete these records? This process can't be undone</Text>
                <View style={styles.row}>
                    <Button style={{
                        ...styles.button,
                        ...styles.gray
                    }} text='Cancel'
                    onPress={onClose}
                    />
                    <Button style={{
                        ...styles.button,
                        ...styles.red
                    }} text='Delete'
                    onPress={onDelete}
                    />
                </View>
            </View>
        </View>
    </ReactNativeModal>
  )
}

export default DeleteConfirmationModal

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        marginTop: 10,
        color: 'black'
    },
    container: {
        backgroundColor: 'white',
        width: 350,
        height: 300,
        alignItems: 'center',
        borderRadius: 5,
        // justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    menuItem: {
        width: 150,
        height: 140,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    
        elevation: 10,
    },
    menuText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        marginTop: 5,
        color: 'black'
    },
    button: {
        width: 150,
        marginHorizontal: 5
    },
    red: {
        backgroundColor: 'red'
    },
    gray: {
        backgroundColor: '#BFBFBF'
    },
    textBold: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: 'black'
    },
    text: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins-regular'
    }
})