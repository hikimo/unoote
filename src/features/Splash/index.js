import React, { useEffect } from 'react'
import { ActivityIndicator, Image, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getThemeColor } from '../../assets/colors'
import { logo } from '../../assets/images'
import { Typography } from '../../components/shared'
import { routes } from '../../navigation/MainNavigation'
import { SET_NAME } from '../../redux/_types/name'

function Splash({ navigation }) {
  const styles = getStyles('light')

  // Dispatcher
  const dispatch = useDispatch()
  
  useEffect(() => {
    checkStorage()
  }, [])

  const checkStorage = async () => {
    const uname = await AsyncStorage.getItem('uname')
    if(uname || uname !== null) {
      dispatch({ type: SET_NAME, payload: uname })
      navigation.replace(routes.notes)
    } else navigation.replace(routes.welcome)
  }
  
  return (
    <>
      <StatusBar backgroundColor={getThemeColor().bgPrimary} />
      <SafeAreaView style={styles.container}>
        <View>
          <Image source={logo} resizeMode='contain' style={styles.logo} />
        </View>

        <ActivityIndicator size='large' color={getThemeColor().light} style={styles.loader} />
        <Typography style={styles.greeter}>Looking for the latest notes</Typography>
      </SafeAreaView>
    </>
  )
}

function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getThemeColor(theme).bgPrimary,
      paddingHorizontal: 10
    },
    logo: {
      height: 150,
      width: 150
    },
    greeter: {
      marginTop: -10,
      fontSize: 22,
      color: getThemeColor('light').light,
      textAlign: 'center'
    },
    loader: {
      marginTop: 20
    }
  })
}

export default Splash