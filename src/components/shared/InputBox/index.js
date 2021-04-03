import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { fonts } from '../../../assets/fonts'
import { getThemeColor } from '../../../assets/colors'

export function InputBox({ theme = 'light', onKeyPress, value, textStyle = [], contentContainerStyle = [] }) {
  const styles = getStyles(theme)

  let textStyles
  let containerStyles

  if(Array.isArray(contentContainerStyle))
    containerStyles = [styles.btn, ...contentContainerStyle]
  else
    containerStyles = [styles.btn, contentContainerStyle]

  if(Array.isArray(textStyle))
    textStyles = [styles.btnLabel, ...textStyle]
  else
    textStyles = [styles.btnLabel]
    
  return (
    <View style={styles.boxField}>
      <TextInput onKeyPress={onKeyPress} style={styles.boxFieldText} value={value} placeholder='Your name'  />
    </View>
  )
}

function getStyles(theme = 'light' | 'dark') {
  return StyleSheet.create({
    boxField: {
      paddingVertical: 1,
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
    }
  })
}