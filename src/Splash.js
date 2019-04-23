import React, { Component } from "react";
import { View, Image, StyleSheet } from 'react-native'
import App from './App'

export class Splash extends Component {

  constructor(props) {
    super(props)
    this.state = { showSplash: false }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ...this.state,
        showSplash: false
      });
    }, 3000)
  }

  render() {
    if (this.state.showSplash === true) {
      return <View style={styles.outerView}>
        <Image style={{width: '100%', height: '100%'}} source={require('./assets/ipos_splash_screen.png')} />
      </View>
    } else {
      return <App />
    }
  }
}

const styles = StyleSheet.create({
  outerView: { flex: 1 },
})


