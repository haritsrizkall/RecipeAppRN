import { StyleSheet, Text, View, TextInput as RNTextInput, ViewStyle, ButtonProps, TextInputProps, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    placeholder?: string,
    value?: string,
    onChangeText?: (text: string) => void,
    containerStyle?: ViewStyle,
    restProps?: TextInputProps,
    onPress?: () => void,
    error?: string,
    textInputStyle?: ViewStyle, 
    multiline?: boolean
}

const TextInput = ({placeholder, value, onChangeText, containerStyle, onPress, restProps, error, textInputStyle, multiline=false}: Props) => {
  return (
    <>
    {onPress ? (
      <>
      <TouchableOpacity 
      onPress={onPress}
      style={{
          ...styles.container,
          ...containerStyle,
      }}
      >
        <RNTextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor= '#787878'
          multiline={multiline}
          {...restProps}
        />
      </TouchableOpacity>
       </>
    ) : (
      <View 
      style={{
          ...styles.container,
          ...containerStyle,
      }}
      >
        <RNTextInput
          style={{
            ...styles.textInput,
            ...textInputStyle,
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor='#787878'
          multiline={multiline}
          {...restProps}
        />
        {error !== '' && (
          <Text style={{
            color: 'red',
          }}>{error}</Text>
        )}
      </View>
    )}
    </>
  
  )
}

export default TextInput

const styles = StyleSheet.create({
    container: {  
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
        minHeight: 48,
        borderRadius: 7,
        width: 309,
        paddingHorizontal: 15,
        backgroundColor: '#F3F3F3',
        marginVertical: 10,
        fontSize: 14,
        color: 'black',
    }
})