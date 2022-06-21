import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SearchIcon } from '../assets'

const SearchBar = () => {
  return (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal:10,
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
  
        elevation: 3,
      }}>
        <Image source={SearchIcon} style={{
          width: 20,
          height: 20
        }}/>
        <TextInput placeholder='Search...'/>
      </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})