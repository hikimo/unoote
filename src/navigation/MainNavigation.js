import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'

// Components
import Splash from '../features/Splash'
import Welcome from '../features/Welcome'
import Notes from '../features/Notes'
import NotesForm from '../features/NotesForm'

const Stack = createStackNavigator()

// used for reduce miss typing (typo) problem
export const routes = {
  splash: 'Splash',
  welcome: 'Welcome',
  notes: 'Notes',
  notesForm: 'NotesForm'
}

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={routes.splash} component={Splash} />
        <Stack.Screen name={routes.welcome} component={Welcome} />
        <Stack.Screen name={routes.notes} component={Notes} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} />
        <Stack.Screen name={routes.notesForm} component={NotesForm} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
