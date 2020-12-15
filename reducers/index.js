import {
    RECEIVE_DECKS,
    ADD_DECK,
    REMOVE_DECK,
    ADD_CARD,
    RESET_DATA
  } from '../actions/index';
  
  export default function decks(state = {}, action) {
    switch (action.type) {
      case RECEIVE_DECKS:
        return {
          ...state,
          ...action.decks
        };

      case ADD_DECK:
        const { title } = action;
        return {
          ...state,
          [title]: {
            title,
            cards: []
          }
        };

      case REMOVE_DECK:
        const { id } = action;

        const { [id]: value, ...remainingDecks } = state;

        return remainingDecks;

      case ADD_CARD:
        const { deckId, card } = action;
        return {
          ...state,
          [deckId]: {
            ...state[deckId],
            cards: [...state[deckId].cards].concat(card)
          }
        };

      case RESET_DATA:
        return {...action.decks}

      default:
        return state;
    }
  }