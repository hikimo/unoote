import React from 'react'
import { getThemeColor } from '../../../assets/colors'
import { Text, StyleSheet } from 'react-native'
import { fonts } from '../../../assets/fonts'

export function Typography({ style = [], children, weight, type, theme }) {
  const styles = getStyles(theme)
  let textStyles

  if(Array.isArray(styles))
    textStyles = [styles.base, ...style]
  else
    textStyles = [styles.base, style]

  if(weight || type)
    textStyles.push(fontConfig(theme, type, weight))
  
  return <Text style={textStyles}>{ children }</Text>
}

function fontConfig(theme, type = 'default', weight = 'normal') {
  const styles = getStyles(theme)
  
  if(type === 'title') {
    switch (weight) {
      case 'light':
        return styles.tLight
      case 'light-italic':
        return styles.tLightItalic
      case 'normal':
        return styles.tRegular
      case 'normal-italic':
        return styles.tRegularItalic
      case 'bold':
        return styles.tBold
      case 'bold-italic':
        return styles.tBoldItalic
      default:
        return styles.tRegular
    }
  } else {
    switch (weight) {
      case 'light':
        return styles.light
      case 'light-italic':
        return styles.lightItalic
      case 'normal':
        return styles.regular
      case 'normal-italic':
        return styles.regularItalic
      case 'bold':
        return styles.bold
      case 'bold-italic':
        return styles.boldItalic
      default:
        return styles.regular
    }
  }
}

function getStyles(theme) {
  return StyleSheet.create({
    base: {
      color: getThemeColor(theme).dark,
      fontSize: 16,
      fontFamily: fonts.mali.regular.normal
    },

    // Fonts style
    // Default font
    light: {
      fontFamily: fonts.mali.light.normal
    },
    lightItalic: {
      fontFamily: fonts.mali.light.italic
    },
    regular: {
      fontFamily: fonts.mali.regular.normal
    },
    regularItalic: {
      fontFamily: fonts.mali.regular.italic
    },
    bold: {
      fontFamily: fonts.mali.bold.normal
    },
    boldItalic: {
      fontFamily: fonts.mali.bold.italic
    },

    // Title Fonts
    tLight: {
      fontFamily: fonts.openSans.light.normal
    },
    tLightItalic: {
      fontFamily: fonts.openSans.light.italic
    },
    tRegular: {
      fontFamily: fonts.openSans.regular.normal
    },
    tRegularItalic: {
      fontFamily: fonts.openSans.regular.italic
    },
    tBold: {
      fontFamily: fonts.openSans.bold.normal
    },
    tBoldItalic: {
      fontFamily: fonts.openSans.bold.italic
    },
  })
}