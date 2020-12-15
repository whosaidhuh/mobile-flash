import AsyncStorage from '@react-native-async-storage/async-storage';
import { decks } from './_DATA';

const DECKS_STORAGE_KEY = 'flashcards:decks';

export async function getDecks() {
    //getDecks: return all of the decks along with their titles, questions, and answers.
  try {
      /*fetch decks data or return null otherwise.

      store data in the variable "storedResults"*/
    const storedResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if (storedResults === null) {
    // if storedResults is empty (i.e. no data was fetched) then store the "decks" data in AsyncStorage
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    }

    return storedResults === null ? decks : JSON.parse(storedResults);

  } catch (err) {
      // error reading value
    console.log(err);
  }
}

