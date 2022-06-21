import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AddIcon, SearchIcon, Trash } from '../../assets'
import SearchBar from '../../components/SearchBar'
import { NavigationProp } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRecipe, fetchRecipes } from '../../redux/actions/recipe'
import { RootStore } from '../../redux/store'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'

type Props = {
  navigation: NavigationProp<any>
}
const HomeScreen = ({navigation}: Props) => {
  const recipes = useSelector((state: RootStore) => state.recipeReducer.recipes)
  const [deleteMode, setDeleteMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRecipes())
  }, [])
  
  return (
    <ScrollView>
    <DeleteConfirmationModal
      isVisible={deleteMode}
      onClose={() => setDeleteMode(false)}
      onDelete={() => {
        dispatch(deleteRecipe(selectedItem.id))
      }}
    />
    <View style={{marginHorizontal: 24}}>
      <View style={{marginTop: 20}}>
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{flex: 1}}>
            <SearchBar/>
          </View>
          <TouchableOpacity 
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Add')}  
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'red',
                borderRadius: 5,
                marginLeft: 5,
                padding: 5,
                paddingHorizontal: 13,
                alignItems: 'center',
                justifyContent: 'center',
                shadowOffset: {
                  width: 1,
                  height: 4,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 3,
              }}>
              <Image source={AddIcon} style={{
                width: 20,
                height: 20
              }}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          marginTop: 15
        }}>
          {recipes.map((val, index) => (
            <TouchableOpacity activeOpacity={0.6}>
            <View style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              alignItems: 'center',
              padding: 15,
              borderRadius: 5, 
              marginVertical: 5,
              shadowColor: "#000",
               shadowOffset: {
                   width: 0,
                   height: -3,
               },
               shadowOpacity: 0.23,
               shadowRadius: 2.62,

               elevation: 3,
            }}>
              <View style={{flex:1}}>
                  <Text>{val.name}</Text>
                <Text>{val.description}</Text>
              </View> 
              <TouchableOpacity activeOpacity={0.6} onPress={() => setDeleteMode(true)}>
                <Image source={Trash} style={{
                  width: 25,
                  height: 32,
                }}/>
              </TouchableOpacity>
            </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})