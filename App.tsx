import React, { Component, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'

function User({ }) {
  useEffect(() => {
    const subscriber = firestore().collection('Users')
      .doc('43klWAkIl36kCtudRBHm').onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });
    return () => subscriber();
  });
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View >
          <TouchableOpacity style={
            styles.touchStyle
          }
            onPress={async () => {
              await firestore().collection('Users').add({ name: 'Alaettin', age: 27 }).then(() => {
                console.log('User added!');

              })
            }}>
            <Text style={
              styles.btnStyle
            }>Kullanııcı Ekle</Text>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={
            styles.touchStyle

          } onPress={async () => {
            await firestore().collection('Users')
              .doc('43klWAkIl36kCtudRBHm')
              .update({
                'age': 50
              }).then(() => {
                console.log('Users Updated');

              })
          }}>
            <Text style={
              styles.btnStyle
            }>Kullanıcı Güncelle...</Text>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={
            styles.touchStyle
          } onPress={async () => {
            await firestore().collection('Users')
              .doc('f5vwwHPrnRRJ59ek1hdr').delete()
              .then(() => {
                console.log('User Deleted!');
              })
          }}>
            <Text style={
              styles.btnStyle
            }>Kullanıcı Sil...</Text>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={
            styles.touchStyle
          } onPress={ async () => {
           await firestore()
              .collection('Users')
              .doc('43klWAkIl36kCtudRBHm')
              .get()
              .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                  console.log('User data: ', documentSnapshot.data());
                }
              });
          }}>
            <Text style={
              styles.btnStyle
            }>Kullanıcı getir...</Text>
          </TouchableOpacity>
        </View>  
        <View >
          <TouchableOpacity style={
            styles.touchStyle
          } onPress={async () => {

            await firestore()
              .collection('Users')
              .get()
              .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                  console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                });
              });
          }}>
            <Text style={
              styles.btnStyle
            }>Tüm Kullanıcıları getir...</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    flex: 2
  },
  touchStyle: {
    margin: 5,
    backgroundColor: 'grey',
    borderRadius: 5
  },
  btnStyle: {
    margin: 10,
    fontSize: 15,
    fontWeight: '500',
    color: 'white'
  },
  textStyle: {
    margin: 10,
    fontSize: 18,
    fontWeight: '600'
  }
})
