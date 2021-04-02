import React from 'react'
import { View, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, TextInput, Image } from 'react-native'
import { getThemeColor } from '../../assets/colors'
import { fonts } from '../../assets/fonts'
import { logo } from '../../assets/images'
import Typography from '../../components/shared/Typography'

function Welcome({ navigation }) {
  const styles = getStyles('light')

  return (
    <>
      <StatusBar backgroundColor={getThemeColor().bgPrimary} />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={logo} style={styles.logo} resizeMode='contain' />
          
          <Typography type='title' weight='bold' style={styles.title}>Welcome to Unoote</Typography>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.boxField}>
            <TextInput style={styles.boxFieldText} placeholder='Your name'  />
          </View>

          <TouchableOpacity style={styles.btn}>
            <Typography style={styles.btnLabel} type='title' weight='bold'>Confirm</Typography>
          </TouchableOpacity>
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
      width: '100%',
      backgroundColor: getThemeColor(theme).light,
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 20
    },

    boxField: {
      paddingVertical: 2,
      paddingHorizontal: 10,
      backgroundColor: getThemeColor(theme).light,
      borderWidth: 1,
      borderColor: getThemeColor(theme).borderGray,
      borderRadius: 10
    },
    boxFieldText: {
      fontSize: 14,
      fontFamily: fonts.openSans.regular.normal,
      color: getThemeColor(theme).dark
    },

    btn: {
      marginVertical: 10,
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: getThemeColor(theme).btnPrimary,
      borderRadius: 5,
    },
    btnLabel: {
      color: getThemeColor(theme).light
    }
  })
}

export default Welcome