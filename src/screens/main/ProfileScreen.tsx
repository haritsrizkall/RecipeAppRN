import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ProfileImg } from '../../assets'
import { NavigationProp } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import { signOut } from '../../redux/actions/auth'

type Props = {
  navigation: NavigationProp<any>
}

const ProfileScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const onSubmit = () => {
    console.log('OUT')
    dispatch(signOut({navigation}))
  }
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image 
          source={ProfileImg} 
          style={styles.profileImg}
        />
        <Text style={styles.name}>Harits Rizkal Aliamdy</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          text='Log out' 
          style={styles.button}
          onPress={onSubmit}  
        />
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems:'center',
    paddingVertical:50,
  },
  profileImg: {
    width: 125,
    height: 125,
    borderRadius: 200
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#929292',
    marginTop: 15
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    marginBottom: 15,
    backgroundColor: '#FF0000'
  }
})