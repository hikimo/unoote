import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { fonts } from '../../../assets/fonts'
import { getThemeColor } from '../../../assets/colors'

export function InputBox({ multiline = false, theme = 'light', onChangeText, placeholder, value, textStyle = [], contentContainerStyle = [] }) {
  const styles = getStyles(theme)

  let textStyles
  let containerStyles

  const _changeTextHandler = (text) => onChangeText(text)

  if(Array.isArray(contentContainerStyle))
    containerStyles = [styles.boxField, ...contentContainerStyle]
  else
    containerStyles = [styles.boxField, contentContainerStyle]

  if(Array.isArray(textStyle))
    textStyles = [styles.boxFieldText, ...textStyle]
  else
    textStyles = [styles.boxFieldText]
    
  return (
    <View style={containerStyles}>
      <TextInput
        multiline={multiline}
        onChangeText={text => _changeTextHandler(text)} style={textStyles}
        value={value}
        placeholder={placeholder}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
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