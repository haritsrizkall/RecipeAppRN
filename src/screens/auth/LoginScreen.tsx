import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { NavigationProp } from '@react-navigation/native'
import { signIn, test } from '../../redux/actions/auth'
import { useDispatch } from 'react-redux'

type Props = {
  navigation: NavigationProp<any>
}

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const dispatch = useDispatch()

  const onSubmit = () =>{ 
    if (email === '') {
      setEmailError('Email is required')
    }

    if (password === '') {
      setPasswordError('Password is required')
    }

    if (email !== '' && password !== '') {
      dispatch(signIn({email, password, navigation}))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
            <TextInput 
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              error={emailError}
            />
            <TextInput 
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              restProps={{
                secureTextEntry: true
              }}
              error={passwordError}
            />
        </View>
        <View style={styles.btnContainer}>
          <Button text='Login' onPress={onSubmit}/>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.boldText}>Don't have an account? </Text>
          <TouchableOpacity 
          onPress={() => navigation.navigate('Register')} activeOpacity={0.7}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 5
  },
  registerText: {
    color: '#FE0037',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 14
  },
  btnContainer: {
    marginTop: 10
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black'
  }
})