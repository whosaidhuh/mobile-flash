import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Deck(props){

  const { deck } = props;
  console.log(deck)

  return (
    <View style={styles.deckContainer}>
      <View>
        <Text style={styles.deckText}>{deck.title}</Text>
      </View>
      <View>
        <Text style={styles.cardText}>{deck.cards.length} cards</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deckContainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'yellow',
  },
  deckText: {
    fontSize: 24
  },
  cardText: {
    fontSize: 18,
    color: 'cyan'
  }
});

export default Deck;