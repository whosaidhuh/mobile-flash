import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

class AddDeck extends Component {

  state = {
    text: ''
  };
  handleChange = text => {
    this.setState({ text });
  };
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Add a new deck</Text>
            <View>
            <TextInput
                placeholder="What is the title of your new deck?"
                style={styles.input}
                value={this.state.value}
                onChangeText={this.handleChange}
            />
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Create Deck</Text>
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

    title: {
        fontSize: 32,
    },

    input: {
        marginTop: 20,
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 50,
        backgroundColor: '#DCDCDC',
    },
    btn: {
        marginTop: 20,
        width: 300,
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
    }
});

export default AddDeck;