import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../redux/store'

const Loading = () => {
  const isLoading = useSelector((state: RootStore) => state.globalReducer.isLoading)
  return (
    <View style={{
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        display: isLoading ? 'flex' : 'none'
    }}>
        <ActivityIndicator size="large" color="green" />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})