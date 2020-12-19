import React, { Component } from 'react';
import {Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Deck from './Deck';

class DeckInfo extends Component {
  render() {

    const { navigation } = this.props;
    const { cards, title }= this.props.route.params;

    return (
      <View style={styles.container}>
        <View>
              <Text>{title}</Text>
              <Text>Total number of cards: {cards.length} </Text>
            <TouchableOpacity 
            style={[styles.addCard, styles.btn]}
            onPress={() =>
              navigation.navigate('Add Card', { title: title })
            }
            >
              <Text style={styles.btnText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.startQuiz, styles.btn]}>
                    <Text style={styles.btnText}>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.deleteDeck, styles.btn]}>
                    <Text style={styles.btnText}>Delete Deck</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },

    btn: {
        marginTop: 20,
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addCard: {
        backgroundColor: '#19d467',
        
    },

    startQuiz: {
        backgroundColor: '#afd119',
    },

    deleteDeck: {
        backgroundColor: '#b83773',
    },

    btnText: {
        fontSize: 18,
        color: '#fff'
    }
});

export default DeckInfo;
