import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../../redux/store'
import Header from '../../components/Header'
import Button from '../../components/Button'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import { deleteRecipe, selectRecipe } from '../../redux/actions/recipe'

type Props = {
    navigation: NavigationProp<any>
}
const DetailScreen = ({navigation}: Props) => {
  const recipe = useSelector((state: RootStore) => state.recipeReducer.selectedRecipe)
  const dispatch = useDispatch();
  const [deleteMode, setDeleteMode] = useState(false)
  return (
    <View style={styles.container}>
      <DeleteConfirmationModal
        isVisible={deleteMode}
        onClose={() => setDeleteMode(false)}
        onDelete={() => {
          dispatch(deleteRecipe(recipe._id))
          navigation.goBack();
        }}
      />
      <Header text='Detail Recipe'/>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Name</Text>
          <Text style={styles.itemText}>{recipe.name}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Description</Text>
          <Text style={styles.itemText}>{recipe.description}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Ingredients</Text>
          <View>
            {recipe.ingredients.map((item: any, index: number) => {
              return (
                <View key={index}>
                  <Text style={styles.itemText}>{`${index+1}. ${item}`}</Text>
                </View>
              )
            })}
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Steps</Text>
          {recipe.steps.map((item: any, index: number) => {
            return (
              <View key={index}>
                <Text style={styles.itemText}>{`${index+1}. ${item}`}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>   
      <View style={styles.buttonContainer}>
        <Button text='Edit' style={{
          ...styles.button,
          ...styles.green,
        }}
          onPress={() => {
            navigation.navigate('Edit')
          }}
        />
        <Button text='Delete' style={{
          ...styles.button,
          ...styles.red,
        }} onPress={() => {
          setDeleteMode(true)
        }}/>
      </View>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    marginHorizontal: 20,
    flex: 1
  },
  item: {
    marginVertical: 15
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Black',
    color: 'black'
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'black'
  },
  button: {
    width: 170,
    marginHorizontal: 5
},
green: {
    backgroundColor: '#00A023'
},
red: {
    backgroundColor: '#FF0000'
},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
},
})