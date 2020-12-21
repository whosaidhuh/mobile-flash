import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { addDeck } from '../actions/index';

class AddDeck extends Component {

  state = {
    text: ''
  };
  handleChange = text => {
    this.setState({ text });
  };

  handleSubmit =()=>{
  const title = this.state.text.trim()
  this.props.dispatch(addDeck(title))
  this.setState({text:""})
  this.props.navigation.navigate('Deck Info', { 
    title: title, 
    cards: [] 
  })
  }

  render() {

    const { text, value } = this.state;

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Add a new deck</Text>
            <View>
              <TextInput
                  placeholder="What is the title of your new deck?"
                  style={styles.input}
                  value={value}
                  onChangeText={this.handleChange}
              />
              <TouchableOpacity
              disabled={text.trim()===""}
              onPress={this.handleSubmit}
              style={text.trim()==="" ? styles.disabled : styles.btn}>
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

    disabled: {
      marginTop: 20,
      width: 300,
      height: 40,
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
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

export default connect()(AddDeck);