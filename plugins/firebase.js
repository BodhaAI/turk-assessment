import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

var config = {
  apiKey: 'AIzaSyCZGiWGJpc5kA3Vr_KIUU79GjneCB8qGl0',
  date_format: 'DD MMM YYYY, HH:mm',
  authDomain: 'bodha-qa.firebaseapp.com',
  databaseURL: 'https://bodha-qa.firebaseio.com',
  projectId: 'bodha-qa',
  storageBucket: 'gs://bodha-qa.appspot.com',
  messagingSenderId: '872632909273',
  appengine_baseurl: 'https://bodha-qa.appspot.com',
  stripe_public_key: 'pk_test_0rfWTyHKMaiNogfuOb3B9AjK',
  cloud_https_baseurl: 'https://us-central1-bodha-qa.cloudfunctions.net/',
  algolia_config: {
    config: {
      algoliaAppId: 'SDN6FC1CEB',
      algoliaSearchKey: '4890344aac265dfd1ec9d761884e8d03'
    },
    indexes: {
      JOBS: 'jobs-qa',
      CANDIDATES: 'candidates-qa'
    }
  }
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
// export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
// export const DB = firebase.database()
export const projectId = config.projectId
export const stripeKey = config.stripe_public_key
export const stripeObject = null
export const firestore = firebase.firestore()
export const firebaseAuth = firebase.auth()
export let storage = firebase.storage()
export const appengineBaseurl = config.appengine_baseurl
export const cloudHttpsBaseurl = config.cloud_https_baseurl
export const dateFormat = config.date_format
export const algoliaConfig = config.algolia_config
export const currentUser = async () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user, error) => {
      if (user) {
        return resolve(user)
        // console.log('user from firebase', user)
      }
      if (error) {
        return reject(error)
        // console.log('error from firebase', error)
      } else {
        return resolve(null)
        // console.log('null from firebase')
      }
    })
  })
}
