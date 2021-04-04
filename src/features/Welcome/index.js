import React, { useState } from 'react'
import { View, ImageBackground, StatusBar, StyleSheet, Image } from 'react-native'
import { Button, Checkbox, InputBox, Typography } from '../../components/shared'
import { bgImage, logo } from '../../assets/images'
import { getThemeColor } from '../../assets/colors'
import { routes } from '../../navigation/MainNavigation'

function Welcome({ navigation }) {
  const styles = getStyles('light')
  const [keep, setKeep] = useState(false)
  const [name, setName] = useState('')

  const _btnConfirmHandler = () => navigation.replace(routes.notes)
  const _inputBoxNameHandler = (text) => setName(text)
  
  return (
    <>
      <StatusBar backgroundColor='transparent' translucent={true}   />
      <ImageBackground source={bgImage} style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={logo} style={styles.logo} resizeMode='contain' />
          
          <Typography type='title' weight='bold' style={styles.title}>Welcome to Unoote</Typography>
        </View>

        <View style={styles.formContainer}>
          
          <InputBox onChangeText={_inputBoxNameHandler} value={name} placeholder='Your name' />

          <Checkbox theme='light' label='Keep me logged in' active={keep} onPress={() => setKeep(!keep)} />

          <Button onPress={_btnConfirmHandler} theme='light' label="Confirm" />
          
        </View>
      </ImageBackground>
    </>
  )
}

function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'cover',
      backgroundColor: getThemeColor(theme).bgPrimary
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