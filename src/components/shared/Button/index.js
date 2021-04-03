import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { getThemeColor } from '../../../assets/colors'
import { Typography } from '../index'

export function Button({ theme = 'light' | 'dark' , onPress, label, textStyle = [], contentContainerStyle = [], variant = 'primary' , disabled }) {
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

  if(!disabled && variant)
    containerStyles.push(btnConfig(theme, variant))
  
  if(disabled)
    containerStyles.push(styles.btnDisabled)
    
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={containerStyles}>
        <Typography style={textStyles} type='title' weight='bold'>{label}</Typography>
      </View>
    </TouchableOpacity>
  )
}

function btnConfig(theme, variant = 'primary') {
  const styles = getStyles(theme)

  switch (variant) {
    case 'primary':
      return null
    case 'warn':
      return styles.btnWarning
    case 'danger':
      return styles.btnDanger
  }
}

function getStyles(theme = 'light' | 'dark') {
  return StyleSheet.create({
    btn: {
      marginBottom: 10,
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: getThemeColor(theme).btnPrimary,
      borderRadius: 5,
    },
    btnLabel: {
      flexWrap: 'wrap',
      color: getThemeColor(theme).light,
    },

    btnDanger: {
      backgroundColor: getThemeColor(theme).btnDanger
    },
    btnWarning: {
      backgroundColor: getThemeColor(theme).btnWarn
    },
    btnDisabled: {
      backgroundColor: getThemeColor(theme).borderGray
    }
  })
}