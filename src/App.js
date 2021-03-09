import './App.css';
import { Component } from "react";
import firebase from "firebase/app";
import 'firebase/firestore';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: (<br />)
    }
    this.get.bind(this)
  }

  componentDidMount() {
    if (firebase.apps.length === 0) {
      const app = firebase.initializeApp({
        apiKey: "AIzaSyCqrvvzxTPZEsQQI8xM2FUidiEIuELGwlI",
        authDomain: "testproj-42c86.firebaseapp.com",
        projectId: "testproj-42c86",
        storageBucket: "testproj-42c86.appspot.com",
        messagingSenderId: "802081963730",
        appId: "1:802081963730:web:990e3cc4ca496a5238b70b",
        measurementId: "G-6M6S7BTQQV"
      })
    }
    this.db = firebase.firestore();
    this.doc = this.db.collection('data').doc('emrUDagYMAxrRtc7cvxv');
  }

  refresh(arg) {
    this.doc.update({text: arg})
  }

  async get() {
    var data = await this.doc.get()
    this.setState({
      text: data.data().text
    })
  }

  render() {
    return (
      <div>
        {this.state.text}
        <form onSubmit={e=>{
          e.preventDefault()
          console.log(e.target.str.value)
          this.refresh(e.target.str.value)
          this.get()
        }}>
          <input type="text" name="str" />
          <input type="button" value="Refresh value" onClick={e=>{this.get()}} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}
