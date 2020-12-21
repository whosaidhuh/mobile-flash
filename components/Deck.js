import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Deck(props){

  const { cards, id } = props;
  return (
    <View style={styles.container}>
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
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10
},

  deckText: {
    fontSize: 24
  },
  cardText: {
    fontSize: 18,
    color: 'grey'
  }
});

export default Deck;