import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { NavigationProp } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { signUp } from '../../redux/actions/auth'

type Props = {
  navigation: NavigationProp<any>
}

const RegisterScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const onSubmit = () => {
    if (email === '') {
      setEmailError('Email is required')
    }

    if (password === '') {
      setPasswordError('Password is required')
    }

    if (name === '') {
      setNameError('Name is required')
    }

    if (email !== '' && password !== '' && name !== '') {
      dispatch(signUp({name, email, password, navigation}))
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
            <TextInput 
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput 
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput 
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              restProps={{
                secureTextEntry: true
              }}
            />
        </View>
        <View>
          <Button text='Register' onPress={onSubmit}/>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.boldText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
            <Text style={styles.registerText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default RegisterScreen

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
  boldText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black'
  }
})