import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { IcAddOff, IcAddOn, IcHomeOff, IcHomeOn,  IcProfileOff, IcProfileOn } from '../assets'
import { useDispatch } from 'react-redux'
import { GlobalActionType } from '../redux/reducers/global'
import { setAddMode } from '../redux/actions'


type Props = {
    state: any,
    descriptors: any,
    navigation: any
}

const Icon = ({label, focus}: {label: string, focus: boolean}) => {
    switch (label) {
        case 'Home':
            return focus ? <IcHomeOn/> : <IcHomeOff/>
            break;
        case 'Add':
            return focus ? <IcAddOn/> : <IcAddOff/>
        case 'Profile': 
            return focus ? <IcProfileOn/> : <IcProfileOff/>
        default:
          null;
            break;
    }
}
const BottomTab = ({ state, descriptors, navigation }: Props) => {
  
  const dispatch = useDispatch()
  const openAddModal = () => {
    dispatch(setAddMode(true))
  }
  return (
    <View style={styles.container}>
    {state.routes.map((route:any, index:any) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          // The `merge: true` option makes sure that the params inside the tab screen are preserved
         
            navigation.navigate({ name: route.name, merge: true });
          
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <TouchableOpacity
          key={index}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={{ 
              justifyContent: 'center',
              alignItems: 'center'
            }}
        >
          <Icon label={label} focus={isFocused}/>
        </TouchableOpacity>
      );
    })}
  </View>
  )
}

export default BottomTab

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        justifyContent: 'space-around',
        paddingTop: 15,
        paddingBottom: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 1,
    }
})