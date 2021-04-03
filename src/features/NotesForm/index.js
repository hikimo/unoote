import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, InputBox, Typography } from '../../components/shared'

function NotesForm({ navigation }) {
  const styles = getStyles('light')
  const [form, setForm] = useState({
    id: undefined,
    name: '',
    title: '',
    detail: '',
    tag: ''
  })
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formGroup}>
        <Typography type='title' weight='bold' style={styles.label}>
          Title
        </Typography>
        <InputBox placeholder='A mochi daikazoku' />
      </View>

      <View style={styles.formGroup}>
        <Typography type='title' weight='bold' style={styles.label}>
          Detail
        </Typography>
        <InputBox multiline placeholder='After hearing the mochi daikazoku, I run into a library to find that book' />
      </View>

      <View style={styles.formGroup}>
        <Typography type='title' weight='bold' style={styles.label}>
          Tag
        </Typography>
        <InputBox placeholder='wishlish' />
      </View>

      <View style={[styles.formGroup, styles.btnGroup]}>
        <Button label='Save' theme='light' />
      </View>
      
    </SafeAreaView>
  )
}

function getStyles(theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 20
    },
    formGroup: {
      marginBottom: 10
    },
    btnGroup: {
      marginTop: 10
    },
    label: {
      marginBottom: 5
    }
  })
}

export default NotesForm