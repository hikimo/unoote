import React from 'react'
import { View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'

import { Typography, Button } from '../../components/shared'
import { routes } from '../../navigation/MainNavigation'
import { getThemeColor } from '../../assets/colors'

function Notes({ navigation }) {
  const styles = getStyles('light')
  const _btnAddHandler = () => navigation.navigate(routes.notesForm, { title: 'Note Form' })
  
  return (
    <>
      <StatusBar backgroundColor={getThemeColor().dark} />
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <Typography theme='dark' type='title' style={styles.title}>Hello, Rangga!</Typography>
          <Button theme='light' variant='danger' label='Change Name' />
        </View>

        <View style={styles.listContainer}>
          
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={{flex: 1}}>
                <Typography weight='bold' style={styles.cardTitle}>Create a new app</Typography>
              </View>
              <View style={styles.cardTag}>
                <Typography theme='dark' type='title' weight='bold' style={styles.cardTagTitle}>TODO</Typography>
              </View>
            </View>
            <View>
              <Typography type='title' style={styles.cardDesc}>Hikimo | 07 Jun 2021</Typography>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={{flex: 1}}>
                <Typography weight='bold' style={styles.cardTitle}>Create a new app</Typography>
              </View>
              <View style={styles.cardTag}>
                <Typography theme='dark' type='title' weight='bold' style={styles.cardTagTitle}>TODO</Typography>
              </View>
            </View>
            <View>
              <Typography type='title' style={styles.cardDesc}>Hikimo | 07 Jun 2021</Typography>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={{flex: 1}}>
                <Typography weight='bold' style={styles.cardTitle}>Create a new app</Typography>
              </View>
              <View style={styles.cardTag}>
                <Typography theme='dark' type='title' weight='bold' style={styles.cardTagTitle}>TODO</Typography>
              </View>
            </View>
            <View>
              <Typography type='title' style={styles.cardDesc}>Hikimo | 07 Jun 2021</Typography>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={{flex: 1}}>
                <Typography weight='bold' style={styles.cardTitle}>Create a new app</Typography>
              </View>
              <View style={styles.cardTag}>
                <Typography theme='dark' type='title' weight='bold' style={styles.cardTagTitle}>TODO</Typography>
              </View>
            </View>
            <View>
              <Typography type='title' style={styles.cardDesc}>Hikimo | 07 Jun 2021</Typography>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={{flex: 1}}>
                <Typography weight='bold' style={styles.cardTitle}>Create a new app</Typography>
              </View>
              <View style={styles.cardTag}>
                <Typography theme='dark' type='title' weight='bold' style={styles.cardTagTitle}>TODO</Typography>
              </View>
            </View>
            <View>
              <Typography type='title' style={styles.cardDesc}>Hikimo | 07 Jun 2021</Typography>
            </View>
          </View>
          
        </View>

        <TouchableOpacity onPress={_btnAddHandler} style={styles.fab} >
          <Typography theme='dark'>Add</Typography>
        </TouchableOpacity>
      </SafeAreaView>
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
    

    fab: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 20,
      right: 20,
      height: 65,
      width: 65,
      backgroundColor: getThemeColor(theme).btnPrimary,
      borderRadius: 45,
      elevation: 2
    }
  })
}

export default Notes