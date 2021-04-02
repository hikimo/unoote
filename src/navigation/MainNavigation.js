import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Components
import Splash from '../features/Splash'
import Welcome from '../features/Welcome'
import Notes from '../features/Notes'
import NotesForm from '../features/NotesForm'

const Stack = createStackNavigator()

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="NotesForm" component={NotesForm} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
