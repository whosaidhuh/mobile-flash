import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Deck(props){

  const { cards, id } = props;
  return (
    <View style={styles.deckContainer}>
      <View>
        <Text style={styles.deckText}>{id}</Text>
      </View>
      <View>
        <Text style={styles.cardText}>{cards.length} cards</Text>
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