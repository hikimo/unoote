import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { getThemeColor } from '../../../assets/colors'
import { Typography } from '../index'

export function Checkbox({ theme, active, onPress, label, contentContainerStyle = [] }) {
  const styles = getStyles(theme)

  let checkboxStyles
  let containerStyles

  if(Array.isArray(contentContainerStyle))
    containerStyles = [styles.checkboxContainer, ...contentContainerStyle]
  else
    containerStyles = [styles.checkboxContainer, contentContainerStyle]

  if(active)
    checkboxStyles = [styles.checkbox, styles.checkboxActive]
  else
    checkboxStyles = [styles.checkbox]
    
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={containerStyles}>
        <View style={checkboxStyles}>
          { active && <View style={styles.checkboxInner} /> }
        </View>

        <Typography theme={theme} type='title' style={styles.label}>{label}</Typography>
      </View>
    </TouchableWithoutFeedback>
  )
}

function getStyles(theme) {
  return StyleSheet.create({
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    checkbox: {
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2,
      height: 24,
      width: 24,
      borderWidth: 1,
      borderColor: getThemeColor(theme).borderGray,
      borderRadius: 5
    },
    checkboxActive: {
      borderColor: getThemeColor(theme).bgPrimaryDarken
    },
    checkboxInner: {
      height: 19,
      width: 19,
      backgroundColor: getThemeColor(theme).bgPrimaryDarken,
      borderRadius: 3
    },

    label: {
      fontSize: 14
    }
  })
}