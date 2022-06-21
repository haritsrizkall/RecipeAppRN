import { StyleSheet, Text, View, TouchableOpacity, ViewStyle} from 'react-native'
import React from 'react'

type Props = {
    text: string,
    onPress?: () => void,
    style?: ViewStyle,
}

const Button = ({text, onPress, style}: Props) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={onPress}
    >
        <View style={{
            ...styles.buttonContainer,
            ...style
        }}>
            <Text style={styles.buttonText}>{text}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#FE0037',
        width: 308,
        height: 49,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    }
})