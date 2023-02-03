import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'


GoogleSignin.configure({
  webClientId: '947580869379-l23boal7j0n516ot3a7m8sceapkettal.apps.googleusercontent.com',
  

});


async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}


export default class App extends Component {

 
  render() {
    return (
      <View style={styles.container}>
         <View >
          <TouchableOpacity style={
            styles.touchStyle
          }
            onPress={ () => {
              onGoogleButtonPress().then(()=>{console.log('signed in with google');
             
            
            })
            }}>
            <Text style={
              styles.btnStyle
            }>Gmail ile giriş yap</Text>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={
            styles.touchStyle
          }
            onPress={async () => {
              await auth().signInWithEmailAndPassword('alaettin@topal.com', 'pas12345')
                .then(() => {
                  console.log('User account  sign in');
                  console.log(auth().currentUser);
                  console.log(auth().currentUser?.email);
                  console.log(auth().currentUser?.emailVerified);
                  
                  
                }).catch(error=>{
                  if(error.code==='auth/email-already-in-use'){
                    console.log('that email address is allready in use!');
                    
                  }
                  if(error.code==='auth/invalid-email'){
                    console.log('that email address is invalid');
                  }
                  console.error(error);
                  
                })
            }}>
            <Text style={
              styles.btnStyle
            }>Email-Şifre ile giriş yap</Text>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={
            styles.touchStyle
          }
            onPress={async () => {
              await auth().createUserWithEmailAndPassword('alaettin@topal.com', 'pas12345')
                .then(() => {
                  console.log('User account created & sign in');
                  console.log(auth().currentUser);
                  
                }).catch(error=>{
                  if(error.code==='auth/email-already-in-use'){
                    console.log('that email address is allready in use!');
                    
                  }
                  if(error.code==='auth/invalid-email'){
                    console.log('that email address is invalid');
                  }
                  console.error(error);
                  
                })
            }}>
            <Text style={
              styles.btnStyle
            }>Email-Şifre ile kayıt ol ve giriş yap</Text>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={
            styles.touchStyle
          }
            onPress={async () => {
              auth().signOut().then(() => {
                console.log('User signed out!.');

              })
            }}>
            <Text style={
              styles.btnStyle
            }>Oturum Kapat</Text>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={
            styles.touchStyle
          }
            onPress={async () => {
              await auth().signInAnonymously()
                .then(() => {
                  console.log('User Signed in anonymously');
                  console.log(auth().currentUser);
                })
                .catch(error => {
                  if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable  anonymous in your firebase console');


                  }
                  console.error(error);
                })
            }}>
            <Text style={
              styles.btnStyle
            }>Anonim Kullanıcı Girişi</Text>
          </TouchableOpacity>
        </View>
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
          } onPress={async () => {
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
