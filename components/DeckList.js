import React, { useEffect } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import Deck from './Deck';
import { handleInitialData } from '../actions/index';
import { connect } from 'react-redux';


function DeckList(props) {

  useEffect(() => {
    props.dispatch(handleInitialData());
  },[]);

  const { decks, navigation } = props;

    return (
      <ScrollView>
        {Object.values(decks).map(deck => {
        return (
          <TouchableOpacity
            key={deck.title}
            onPress={() => 
              navigation.navigate('Deck Info', { 
                title: deck.title,
                cards: deck.cards
              })
            }
            >
            <Deck 
            id={deck.title}
            cards={deck.cards} 
            />
          </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  const mapStateToProps = decks => ({ decks });

export default connect(mapStateToProps)(DeckList);