import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { MinImg } from '../../assets'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { addRecipe, cogserv } from '../../redux/actions/recipe'
import ImageCropPicker from 'react-native-image-crop-picker'
import { setIsLoading } from '../../redux/actions'
import { NavigationProp } from '@react-navigation/native'
import Header from '../../components/Header'

type Props = {
  navigation: NavigationProp<any>
}
const AddScreen = ({navigation}: Props) => {
  const [ingredients, setIngredients] = useState([
    '',
  ])
  const [steps, setSteps] = useState([
    '',
  ])
  const [ingredientsPhoto, setIngredientsPhoto] = useState<any>()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const clearState = () => {
    setIngredients([
      '',
    ])
    setSteps([
      '',
    ])
    setIngredientsPhoto(null)
    setName('')
    setDescription('')
  }
  const onAddIngredients = () => {
    setIngredients([...ingredients, ''])
  }
  const onAddSteps = () => {
    setSteps([...steps, ''])
  }
  
  const handleIngredientsChange = (index: any, value: any) => {
    let data = [...ingredients]
    data[index] = value
    setIngredients(data)
  }
  const handleStepsChange = (index: any, value: any) => {
    let data = [...steps]
    data[index] = value
    setSteps(data)
  }

  const handleRemoveIngredients = (index: any) => {
    if (ingredients.length == 1) {
      return
    }
    let data = [...ingredients]
    data.splice(index, 1)
    console.log(data)
    setIngredients(data)
  }
  const handleRemoveSteps = (index: any) => {
    if (steps.length == 1) {
      return
    }
    let data = [...steps]
    data.splice(index, 1)
    console.log(data)
    setSteps(data)
  }
  const dispatch = useDispatch()
  const onSubmit = () => {
    dispatch(addRecipe({
      name: name,
      ingredients: ingredients,
      steps: steps,
      description: description,
    }, navigation, clearState))
  }
  
  const takeImageIngredients = () => {
    ImageCropPicker.openPicker({
        width: 100,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
      }).then(image => {
        console.log(image);
        const photo = {
          uri: image.path,
          type: 'image/jpeg',
          name: 'photo.jpg',
        }
        const body = new FormData()
        body.append('photo', photo)
        setIngredientsPhoto(photo)
        dispatch(setIsLoading(true))
        cogserv(body).then(res => {
          dispatch(setIsLoading(false))
          if (res.length > 0 && res !== 'No Recognized Text') {
            setIngredients(res)
          }
        }).catch((err) => {
          console.log(err)
          dispatch(setIsLoading(false))
        })
      });
  }

  const takeImageSteps = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      console.log(image);
      const photo = {
        uri: image.path,
        type: 'image/jpeg',
        name: 'photo.jpg',
      }
      const body = new FormData()
      body.append('photo', photo)
      setIngredientsPhoto(photo)
      dispatch(setIsLoading(true))
      cogserv(body).then(res => {
        console.log(res)
        dispatch(setIsLoading(false))
        if (res.length > 0 && res !== 'No Recognized Text') {
          setSteps(res)
        }
      }).catch((err) => {
        console.log(err)
        dispatch(setIsLoading(false))
      })
    });
  }
  return (
      <ScrollView style={styles.container}>
        <Header text='Add Recipe'/>
        <View style={styles.content}> 
                  <View>
                      <Text style={styles.label}>Recipe Name</Text>
                      <TextInput 
                          placeholder='Sate padang'  
                          value={name}
                          onChangeText={setName}
                      />
                  </View>
                  <View>
                      <Text style={styles.label}>Description</Text>
                      <TextInput 
                          placeholder='Sate khas dari padang'
                          value={description}
                          onChangeText={setDescription}
                      />
                  </View>
                  <View>
                    <Text style={{
                      ...styles.label,
                      marginBottom: 10
                    }}>Ingredients</Text>
                    <TouchableOpacity onPress={takeImageIngredients}>
                      <Text>Take a photo</Text>
                    </TouchableOpacity>
                    {ingredients.map((val, index) => {
                      return (
                        <View style={{
                          flexDirection: 'row',
                          marginVertical: 2
                        }}>
                          <TextInput  
                              placeholder='Gula 1 sendok teh'
                              onChangeText={val => handleIngredientsChange(index, val)}
                              textInputStyle={{
                                marginVertical: 0,
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              containerStyle={{
                              }}
                              value={val}
                          />
                          <TouchableOpacity 
                            style={{marginLeft:5, marginTop: 8}}
                            onPress={() => {
                            handleRemoveIngredients(index)
                            console.log(ingredients)
                          }}>
                            <Image source={MinImg} style={{
                              width: 30,
                              height: 30,
                            }} />
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                  </View>
                    <TouchableOpacity onPress={onAddIngredients}>
                            <Text>Add more</Text>
                    </TouchableOpacity>
                  <View>
                    <Text style={{
                      ...styles.label,
                      marginBottom: 10
                    }}>Steps</Text>
                    <TouchableOpacity onPress={takeImageSteps}>
                      <Text>Take a photo</Text>
                    </TouchableOpacity>
                    {steps.map((val, index) => {
                      return (
                        <View style={{
                          flexDirection: 'row',
                          marginVertical: 2
                        }}>
                          <TextInput  
                              placeholder='Tambahkan gula 1 sendok'
                              onChangeText={val => handleStepsChange(index, val)}
                              textInputStyle={{
                                marginVertical: 0,
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              containerStyle={{
                              }}
                              value={val}
                          />
                          <TouchableOpacity 
                            style={{marginLeft:5, marginTop: 8}}
                            onPress={() => {
                            handleRemoveSteps(index)
                          }}>
                            <Image source={MinImg} style={{
                              width: 30,
                              height: 30,
                            }} />
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                  </View>
                    <TouchableOpacity onPress={onAddSteps}>
                            <Text>Add more</Text>
                    </TouchableOpacity>
                  <View style={styles.buttonContainer}>
                      <Button 
                          text='Save'
                          onPress={onSubmit}
                      />
                  </View>
              </View>
      </ScrollView>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
},
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
content: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
},
label: {
    fontSize: 14,
    fontFamily: 'Poppins-Black',
    color: 'black',
},
buttonContainer: {
    flex:1,
    marginTop: 10,
    justifyContent: 'flex-end',
    marginBottom: 20,
}
})