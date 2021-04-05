import React, { useEffect, useState } from 'react'
import { FlatList, View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Icon from 'react-native-vector-icons/AntDesign'

import { Typography, Button } from '../../components/shared'
import { routes } from '../../navigation/MainNavigation'
import { getThemeColor } from '../../assets/colors'

import { SET_NAME } from '../../redux/_types/name'
import { 
  SET_LOADING,
  GET_NOTES,
  GET_NOTES_ERROR,
  SET_LOADING_MORE,
  SET_NOTES_END,
  GET_MORE_NOTES,
  SET_PAGE_NOTE,
  RESET_PAGE_NOTE,
  SET_LOADING_REFRESH,
  RESTART_NOTE
} from '../../redux/_types/note'
import { requestNoteAPI } from '../../api/noteAPI'

// Local helper to convert date into a formated string date (dd.mm.yyyy)
const convertDate = (date) => {
  const temp = new Date(date)

  return `${temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()}.${temp.getMonth() < 10 ? '0' + temp.getMonth() : temp.getMonth()}.${temp.getFullYear()}`
}

// Note list to render on FlatList
function NoteList({ item, viewPress, editPress }) {
  const styles = getStyles('light')

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardTitleContainer}>
          <Typography weight='bold' style={styles.cardTitle}>{item.title}</Typography>
        </View>
        <View style={styles.cardTag}>
          <Typography theme='dark' type='title' weight='bold' style={styles.cardTagTitle}>{item.tags}</Typography>
        </View>
      </View>
      <View style={styles.cardBottom}>
        <View>
          <Typography type='title' style={styles.cardDesc}>{item.name} | {convertDate(item.createdAt)}</Typography>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.cardActionBtn} onPress={viewPress}>
            <Icon name='eye' style={styles.cardActionBtnIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cardActionBtn, styles.ml10]} onPress={editPress}>
            <Icon name='edit' style={styles.cardActionBtnIcon} />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

// Render component for login ( local )
function Loading() {
  const styles = getStyles('light')

  return (
    <View style={styles.centerContainer}>
      <ActivityIndicator style={styles.loadingLoader} size='large' color={getThemeColor('light').bgPrimary} />
      <Typography>Loading</Typography>
    </View>
  )
}

// To render error
function Error({ empty, reload }) {
  const styles = getStyles('light')

  let text = 'Something went wrong!'
  if (empty) text = 'There\'s still nothing here,\nlet\'s create a new one by clicking the blue round button at the bottom right of the corner.'

  return (
    <View style={styles.centerContainer}>
      <Typography style={styles.textCenter}>{text}</Typography>
      { !empty && (<Button theme='light' contentContainerStyle={styles.mt10} onPress={reload} label='Try Again' />)}
    </View>
  )
}

// Render for footer with loading logic
function ListFooter(loading) {
  const styles = getStyles('light')
  
  if(loading) {
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator color={getThemeColor('light').bgPrimary} size='large' />
      </View>
    ) 
  } 
  return (
    <View style={styles.footerContainer}>
      <Typography>The end of line</Typography>
    </View>
  )
}

function Notes({ navigation }) {
  const styles = getStyles('light')

  // Local State
  const [modalVisible, setModal] = useState({
    content: false,
    change: false,
    delete: false
  })
  const [selectedNote, setSelectedNote] = useState({
    title: '',
    name: '',
    detail: '',
    tags: '',
    createdAt: ''
  })

  // Used to check focus
  const isFocused = useIsFocused()

  // Selectors
  const name = useSelector(state => state.name.name)
  const note = useSelector(state => state.note)

  // Dispatcher
  const dispatch = useDispatch()

  useEffect(() => {
    getNotes()
  }, [isFocused])

  const getNotes = async (more = false, refresh = false) => {
    // Will fetched on first load, reload and pull on refresh only
    if (!more) {
      if(refresh) dispatch({ type: SET_LOADING_REFRESH, payload: true })
      else dispatch({ type: SET_LOADING, payload: true })
      dispatch({ type: RESTART_NOTE })

      dispatch({ type: RESET_PAGE_NOTE })

      const params = `?page=0&limit=10`
      dispatch({ type: SET_PAGE_NOTE })

      const payload = await requestNoteAPI(params)

      if (payload) {
        dispatch({ type: GET_NOTES, payload: payload.data.data })
        if(refresh) dispatch({ type: SET_LOADING_REFRESH, payload: false })
        return
      }

      dispatch({ type: GET_NOTES_ERROR })
      return
    }

    // Will hit only on edge scrolling reached
    if (more) {
      
      dispatch({ type: SET_LOADING_MORE, payload: true })
      
      const params = `?page=${note.page}&limit=10`
      const payload = await requestNoteAPI(params)
      
      if (payload) {
        
        if (payload.data.data.length < 10) {
          dispatch({ type: SET_NOTES_END })
        }
        if (payload.data.data.length === 0) {
          dispatch({ type: SET_NOTES_END })
          return
        } else {
          dispatch({ type: SET_PAGE_NOTE })
        }
        dispatch({ type: GET_MORE_NOTES, payload: payload.data.data })
      }
    }
  }

  // Event handlers
  const _btnAddHandler = () => navigation.navigate(routes.notesForm, { title: 'Note Form' })
  const _btnChangeNameConfirmHandler = async () => {
    // Empty state name & Cached name
    await AsyncStorage.removeItem('uname')
    dispatch({ type: SET_NAME, payload: '' })
    setModal({ ...modalVisible, change: false })
    navigation.replace(routes.welcome)
  }
  const _btnDetailHandler = (item) => {
    setSelectedNote({
      name: item.name,
      title: item.title,
      tags: item.tags,
      detail: item.detail,
      createdAt: item.createdAt
    })

    setModal({ ...modalVisible, content: true })
  }
  const _btnEditHandler = (name, item) => {
    const data = {
      id: item.id,
      name: item.name,
      title: item.title,
      detail: item.detail,
      tags: item.tags
    }
    navigation.navigate(routes.notesForm, { title: `Edit ${name}'s note`, data })
  }
  const _refreshHandler = () => {
    getNotes(false, true)
  }
  const _loadMoreHandler = () => {
    if (!note.end && !note.loadingMore) {
      getNotes(true)
    }
  }

  return (
    <>
      <StatusBar backgroundColor={getThemeColor().dark} />
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <Typography theme='dark' type='title' style={styles.title}>Hello, {name}!</Typography>
          <Button theme='light' variant='danger' label='Change Name' onPress={() => setModal({ ...modalVisible, change: true })} />
        </View>

        <View style={styles.listContainer}>
          {
            note.loading ? <Loading />
              : (
                note.error ? <Error reload={getNotes} />
                  : (
                    note.data?.length ?
                      (
                        <FlatList
                          contentContainerStyle={styles.listContainerFlat}
                          data={note.data}
                          renderItem={({ item }) => (
                            <NoteList
                              key={item.id}
                              item={item}
                              viewPress={() => _btnDetailHandler(item)}
                              editPress={() => _btnEditHandler(item.name, item)} />
                          )}
                          keyExtractor={item => item.id}
                          onRefresh={_refreshHandler}
                          refreshing={note.loadingRefresh}
                          onEndReached={_loadMoreHandler}
                          onEndReachedThreshold={0.5}
                          initialNumToRender={10}
                          ListFooterComponent={ListFooter(note.loadingMore)}
                        />
                      )
                      : <Error empty />
                  )
              )
          }
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
              <Button theme='light' label='Cancel' variant='warn' onPress={() => setModal({ ...modalVisible, change: false })} />
              <Button contentContainerStyle={styles.ml10} theme='light' label='Sure' onPress={_btnChangeNameConfirmHandler} />
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
              <Button theme='light' label='Cancel' variant='warn' onPress={() => setModal({ ...modalVisible, delete: false })} />
              <Button contentContainerStyle={styles.ml10} theme='light' label='Sure' variant='danger' onPress={() => setModal({ ...modalVisible, delete: false })} />
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
              <Typography weight='bold' style={styles.modalCardTitle}>{selectedNote.title}</Typography>
              <Typography type='title' style={styles.modalCardTitleSub}>
                {selectedNote.name} | {convertDate(selectedNote.createdAt)}
              </Typography>

              <View style={styles.modalCardMiddle}>
                <View style={styles.modalCardTag}>
                  <Typography theme='dark' weight='bold' type='title' style={styles.modalCardTagText}>{selectedNote.tags}</Typography>
                </View>
              </View>
            </View>

            <View>
              <Typography>{selectedNote.detail}</Typography>
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
      flex: 1
    },

    listContainerFlat: {
      padding: 20
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

    footerContainer: {
      paddingVertical: 20,
      alignItems: 'center',
      width: '100%'
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loadingLoader: {
      marginBottom: 10
    },

    textCenter: {
      textAlign: 'center'
    },
    mt10: {
      marginTop: 10
    },
    ml10: {
      marginLeft: 10
    },
  })
}

export default Notes