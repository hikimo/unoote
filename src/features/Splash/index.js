import React, { useEffect } from 'react'
import { ActivityIndicator, Image, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { getThemeColor } from '../../assets/colors'

import { logo } from '../../assets/images'
import Typography from '../../components/shared/Typography'

function Splash({ navigation }) {
  const styles = getStyles('light')

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome')
    }, 2500)
  }, [])
  
  return (
    <>
      <StatusBar backgroundColor={getThemeColor().bgPrimary} />
      <SafeAreaView style={styles.container}>
        <View>
          <Image source={logo} resizeMode='contain' style={styles.logo} />
        </View>

        <ActivityIndicator size='large' color={getThemeColor().light} style={styles.loader} />
        <Typography style={styles.greeter}>Looking for your notes</Typography>
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