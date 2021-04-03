import React, { useState } from 'react'
import { View, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, TextInput, Image } from 'react-native'
import { getThemeColor } from '../../assets/colors'
import { logo } from '../../assets/images'
import { Button, Checkbox, InputBox, Typography } from '../../components/shared'

function Welcome({ navigation }) {
  const styles = getStyles('light')
  const [keep, setKeep] = useState(false)

  return (
    <>
      <StatusBar backgroundColor={getThemeColor().bgPrimary} />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={logo} style={styles.logo} resizeMode='contain' />
          
          <Typography type='title' weight='bold' style={styles.title}>Welcome to Unoote</Typography>
        </View>

        <View style={styles.formContainer}>
          
          <InputBox />

          <Checkbox theme='light' label='Keep me logged in' active={keep} onPress={() => setKeep(!keep)} />

          <Button theme='light' label="Confirmed" />
          
        </View>
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
    },
    titleContainer: {
      alignItems: 'center',
      marginBottom: 20
    },
    logo: {
      height: 150,
      width: 150,
      marginBottom: 10
    },
    title: {
      fontSize: 26,
      color: getThemeColor(theme).light
    },
    formContainer: {
      marginTop: 10,
      padding: 20,
      paddingBottom: 10,
      width: '100%',
      backgroundColor: getThemeColor(theme).light,
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 20
    }
  })
}

export default Welcome