import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Modal, Text, TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Icon from 'react-native-vector-icons/AntDesign'

import { Typography, Button } from '../../components/shared'
import { routes } from '../../navigation/MainNavigation'
import { getThemeColor } from '../../assets/colors'

import { SET_NAME } from '../../redux/_types/name'

function Notes({ navigation }) {
  const styles = getStyles('light')

  // States
  const [modalVisible, setModal] = useState({
    content: false,
    change: false,
    delete: false
  })

  // Selectors
  const name = useSelector(state => state.name.name)

  // Dispatcher
  const dispatch = useDispatch()

  // Event handlers
  const _btnAddHandler = () => navigation.navigate(routes.notesForm, { title: 'Note Form' })
  const _btnChangeNameConfirmHandler = async () => {
    // Empty state name & Cached name
    await AsyncStorage.removeItem('uname')
    dispatch({type: SET_NAME, payload: ''})
    navigation.replace(routes.welcome)
  }

  return (
    <>
      <StatusBar backgroundColor={getThemeColor().dark} />
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <Typography theme='dark' type='title' style={styles.title}>Hello, {name}!</Typography>
          <Button theme='light' variant='danger' label='Change Name' onPress={() => setModal({...modalVisible, change: true})} />
        </View>

        <View style={styles.listContainer}>

          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.cardTitleContainer}>
                <Typography weight='bold' style={styles.cardTitle}>Create a new app hey hey hey hey hey</Typography>
              </View>
              <View style={styles.cardTag}>
                <Typography theme='dark' type='title' weight='bold' style={styles.cardTagTitle}>TODO</Typography>
              </View>
            </View>
            <View style={styles.cardBottom}>
              <View>
                <Typography type='title' style={styles.cardDesc}>Hikimo | 07 Jun 2021</Typography>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.cardActionBtn} onPress={() => setModal({ ...modalVisible, content: true })}>
                  <Icon name='eye' style={styles.cardActionBtnIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.cardActionBtn, styles.ml10]} onPress={() => navigation.navigate(routes.notesForm, { title: 'Edit Hikimo note' })}>
                  <Icon name='edit' style={styles.cardActionBtnIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.cardActionBtn, styles.ml10]} onPress={() => setModal({ ...modalVisible, delete: true })}>
                  <Icon name='delete' style={styles.cardActionBtnIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>

        <TouchableOpacity onPress={_btnAddHandler} style={styles.fab} >
          <Icon name='plus' style={styles.fabIcon} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Confirm Change Modal */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible.change}>
        <View style={styles.modal}>
          <TouchableWithoutFeedback onPress={() => setModal({ ...modalVisible, change: false })}>
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.modalCard}>

            <View>
              <Typography type='title' weight='bold' style={[styles.modalCardTitle, styles.textCenter]}>Are you sure want to change name?</Typography>
            </View>

            <View style={styles.modalBtnContainer}>
              <Button theme='light' label='Cancel' variant='warn' onPress={() => setModal({...modalVisible, change: false})} />
              <Button contentContainerStyle={styles.ml10} theme='light' label='Sure' onPress={_btnChangeNameConfirmHandler}/>
            </View>

          </View>
        </View>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible.delete}>
        <View style={styles.modal}>
          <TouchableWithoutFeedback onPress={() => setModal({ ...modalVisible, delete: false })}>
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.modalCard}>

            <View>
              <Typography type='title' weight='bold' style={[styles.modalCardTitle, styles.textCenter]}>Are you sure want to delete Hikimo note?</Typography>
            </View>

            <View style={styles.modalBtnContainer}>
              <Button theme='light' label='Cancel' variant='warn' onPress={() => setModal({...modalVisible, delete: false})} />
              <Button contentContainerStyle={styles.ml10} theme='light' label='Sure' variant='danger' onPress={() => setModal({...modalVisible, delete: false})} />
            </View>

          </View>
        </View>
      </Modal>

      {/* Detail modal */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible.content}>
        <View style={styles.modal}>
          <TouchableWithoutFeedback onPress={() => setModal({ ...modalVisible, content: false })}>
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.modalCard}>

            <TouchableOpacity onPress={() => setModal({ ...modalVisible, content: false })} style={styles.modalClose}>
              <Icon name='close' style={styles.modalCloseIcon} />
            </TouchableOpacity>

            <View>
              <Typography weight='bold' style={styles.modalCardTitle}>Create a new app ni ha kotae wa dokoni</Typography>
              <Typography type='title' style={styles.modalCardTitleSub}>
                Noted by Hikimo
              </Typography>

              <View style={styles.modalCardMiddle}>
                <View style={styles.modalCardTag}>
                  <Typography theme='dark' weight='bold' type='title' style={styles.modalCardTagText}>TODO</Typography>
                </View>
              </View>
            </View>

            <View>
              <Typography>
                lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                lorem ipsum dolor sit amet lorem ipsum dolor sit amet
              </Typography>
            </View>

          </View>
        </View>
      </Modal>
    </>
  )
}

function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      paddingVertical: 20,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: getThemeColor(theme).dark,
      elevation: 4
    },
    title: {
      fontSize: 22
    },


    listContainer: {
      margin: 20
    },

    card: {
      justifyContent: 'space-around',
      height: 100,
      marginVertical: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: getThemeColor(theme).light,
      borderRadius: 5,
      elevation: 2
    },
    cardTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    cardTitleContainer: {
      flex: 1
    },
    cardTitle: {
      fontSize: 22,
      lineHeight: 24
    },
    cardTag: {
      padding: 5,
      backgroundColor: getThemeColor(theme).btnDanger,
      borderRadius: 5
    },
    cardTagTitle: {
      fontSize: 12
    },
    cardDesc: {
      fontSize: 14
    },

    cardBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    cardActions: {
      flexDirection: 'row'
    },
    cardActionBtn: {
      height: 24,
      width: 24,
      alignItems: 'center',
      justifyContent: 'center'
    },
    cardActionBtnIcon: {
      fontSize: 18,
      marginRight: 5
    },

    fab: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 20,
      right: 20,
      height: 55,
      width: 55,
      backgroundColor: getThemeColor(theme).btnPrimary,
      borderRadius: 45,
      elevation: 2
    },
    fabIcon: {
      fontSize: 28,
      color: getThemeColor('light').light
    },

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
    modalClose: {
      position: 'absolute',
      top: 10,
      right: 15,
      zIndex: 1
    },
    modalCloseIcon: {
      fontSize: 18
    },
    modalCardTitle: {
      fontSize: 22,
    },
    modalCardTitleSub: {
      marginTop: -5,
      marginBottom: 10,
      fontSize: 14
    },
    modalCardMiddle: {
      flexWrap: 'wrap',
      marginBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    modalCardTag: {
      borderRadius: 5,
      paddingVertical: 4,
      paddingHorizontal: 5,
      backgroundColor: getThemeColor('light').btnDanger
    },
    modalCardTagText: {
      fontSize: 12
    },

    modalBtnContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center'
    },

    textCenter: {
      textAlign: 'center'
    },
    ml10: {
      marginLeft: 10
    },
  })
}

export default Notes