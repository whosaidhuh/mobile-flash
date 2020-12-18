import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { resetData } from '../actions/index';



class Settings extends Component {


  handleResetDecks = () => {
    this.props.resetData()
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Settings </Text>
            <Text>
              This will reset all user data.
            </Text>
            <TouchableOpacity onPress={this.handleResetDecks} style={styles.btn}>
                <Text style={styles.btnText}>Reset</Text>
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

const mapDispatchToProps={
    resetData,
  }
  

export default connect(null, mapDispatchToProps)(Settings);