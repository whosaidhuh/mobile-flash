import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

class Result extends Component {
  render() {

    const {cards, score, title} = this.props.route.params
    const correctPercent= ((score/cards.length)*100).toFixed(1)

    return (
      <View style={styles.container}>
          <View>
                <Text style={styles.title}>Thanks for playing</Text>
                <Text style={styles.block}>Correct answers: {score} out of {cards.length}</Text>
                <Text style={styles.block}>Score percentage: {correctPercent}%</Text>
            </View>
            <View style={styles.buttonSection}>
            <TouchableOpacity 
              onPress={e=>this.props.navigation.push('Start Quiz', {cards, score, title})}
              style={styles.btn}>
            <Text style={styles.btnText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={e=>this.props.navigation.push('Deck Info', {cards, title})}
              style={styles.btn}>
            <Text style={styles.btnText}>Back to Deck</Text>
            </TouchableOpacity>
            </View>
      </View>
    )
  }
}


const styles= StyleSheet.create({
 container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },

  block: {
    margin: 20
  },

  title: {
      fontSize: 32,
      alignItems: 'center',
      margin: 20
  },

  buttonSection:{
    flexDirection:'row', 
    justifyContent:'space-between'
  },

  btn: {
      margin: 20,
      width: 200,
      height: 40,
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: '#009688',
      alignItems: 'center',
      justifyContent: 'center',
  },

  btnText: {
      fontSize: 18,
      color: '#fff'
  },
});

export default  Result