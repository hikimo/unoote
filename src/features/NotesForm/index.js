import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Modal, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Button, InputBox, Typography } from '../../components/shared'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { requestSaveNoteAPI, requestUpdateNoteAPI } from '../../api/noteAPI'
import { getThemeColor } from '../../assets/colors'
import { useRoute } from '@react-navigation/core'

function NotesForm({ navigation }) {
  const styles = getStyles('light')
  const [form, setForm] = useState({
    id: undefined,
    name: '',
    title: '',
    detail: '',
    tags: ''
  })

  const [error, setError] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const route = useRoute()

  // Change event value
  const setVal = (key, val) => {
    setForm({ ...form, [key]: val })
  }

  const checkRoute = () => {
    if (route.params.data) {
      const { id, name, title, detail, tags } = route.params.data

      setForm({
        id, name, title, detail, tags
      })
    }
  }
  const checkName = async () => {
    if (!route.params.data) {
      setVal('name', route.params.name)
    } else {
      setVal('name', route.params.data.name)
    }
  }

  useEffect(() => {
    checkName()
    checkRoute()
  }, [])

  const saveNote = async () => {
    const data = {
      id: form.id,
      name: form.name,
      title: form.title,
      detail: form.detail,
      tags: form.tags
    }

    setModalVisible(true)
    setLoading(true)

    let resp
    
    if (route.params.data) resp = await requestUpdateNoteAPI(data)
    else resp = await requestSaveNoteAPI(data)

    if (resp) {
      setLoading(false)
      setTimeout(() => {
        clearData()
        setModalVisible(false)
        navigation.goBack()
      }, 500);
    } else {
      setError(true)
      setLoading(false)
    }
  }
  const clearData = () => {
    setForm({
      ...form,
      title: '',
      detail: '',
      tags: ''
    })
    setError(false)
  }

  // All event handlers
  const _btnSaveHandler = () => {
    if(
      form.name === ''
      || form.title === ''
      || form.detail === ''
      || form.tags === ''
    ) {
      setModalVisible(true)
      setEmpty(true)
      return
    }
    
    saveNote()
  }
  const _btnCloseHandler = () => {
    setEmpty(false)
    setError(false)
    setModalVisible(false)
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.formGroup}>
          <Typography type='title' weight='bold' style={styles.label}>
            Title
          </Typography>
          <InputBox onChangeText={(text) => setVal('title', text)} value={form.title} placeholder='A mochi daikazoku' />
        </View>

        <View style={styles.formGroup}>
          <Typography type='title' weight='bold' style={styles.label}>
            Detail
          </Typography>
          <InputBox multiline onChangeText={(text) => setVal('detail', text)} value={form.detail} placeholder='After hearing the mochi daikazoku, I run into a library to find that book' />
        </View>

        <View style={styles.formGroup}>
          <Typography type='title' weight='bold' style={styles.label}>
            Tag
          </Typography>
          <InputBox onChangeText={(text) => setVal('tags', text)} value={form.tags} placeholder='wishlish' />
        </View>

        <View style={[styles.formGroup, styles.btnGroup]}>
          <Button onPress={_btnSaveHandler} label='Save' theme='light' />
        </View>
      </SafeAreaView>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}>
        <View style={styles.modal}>
          <TouchableWithoutFeedback onPress={() => setModal({ ...modalVisible, content: false })}>
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>

          <View style={styles.modalCard}>
            {
              loading
                ? (
                  <View style={styles.centeringContent}>
                    <ActivityIndicator color={getThemeColor('light').bgPrimary} size='large' />
                    <Typography>Processing</Typography>
                  </View>
                )
                : empty
                  ? (
                    <View style={styles.centeringContent}>
                      <Typography>There's a field that still empty, you need the fill them up</Typography>
                      <Button theme='light' variant='danger' label='Roger' onPress={_btnCloseHandler} />
                    </View>
                  )
                  : error
                    ? (
                      <View style={styles.centeringContent}>
                        <Typography style={[styles.mb10, styles.textCenter]}>There's something wrong went saving your data, please try again later.</Typography>
                        <Button theme='light' label='Close' onPress={_btnCloseHandler} />
                      </View>
                    )
                    : (
                      <View style={styles.centeringContent}>
                        <Typography style={styles.textCenter}>Note sucesfully {route.params?.data ? 'updated' : 'recorded'}</Typography>
                      </View>
                    )
            }
          </View>
        </View>
      </Modal>
    </>

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
    },

    centeringContent: {
      alignItems: 'center',
      justifyContent: 'center'
    },

    // Modal
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBackdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#00000055'
    },
    modalCard: {
      minWidth: '65%',
      maxWidth: '75%',
      padding: 15,
      backgroundColor: getThemeColor('light').light,
      borderRadius: 5,
      elevation: 5
    },

    textCenter: {
      textAlign: 'center'
    },
    mb10: {
      marginBottom: 10
    }
  })
}

export default NotesForm