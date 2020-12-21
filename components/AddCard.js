import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { addCardToDeck } from '../actions/index'

class AddCard extends Component {

  state = {
    question: '',
    answer: ''
  };
  
  handleQuestionChange = question => {
    this.setState({ question });
  };

  handleAnswerChange = answer => {
    this.setState({ answer });
  };

  handleAddCard = () => {
    const {title} = this.props.route.params
    const { navigation } = this.props
    const {question, answer} = this.state

    this.props.dispatch(addCardToDeck(title, {question, answer}))
    this.setState({question:"", answer:""})
    navigation.navigate('Deck List')
  }

  render() {

    const {question, answer} = this.state

    return (
      <View style={styles.container}>
            <Text style={styles.title}>Add a question</Text>
            <TextInput
              style={styles.input}
              value={question}
              onChangeText={this.handleQuestionChange}
              placeholder="Enter question"
            />
            <TextInput
              style={styles.input}
              value={answer}
              onChangeText={this.handleAnswerChange}
              placeholder="Enter answer"
            />
            <TouchableOpacity
            disabled={question.trim()==="" || answer.trim()===""} 
            onPress={this.handleAddCard}
            style={question.trim()==="" || answer.trim()==="" ? styles.disabled : styles.btn}>
                <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
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
        alignItems: 'center',
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

export default connect()(AddCard);