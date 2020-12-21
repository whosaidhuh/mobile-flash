import React, {useState, useEffect} from 'react';
import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

function Quiz(props) {
 
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const { navigation } = props;
  const { cards, title }= props.route.params;

  useEffect(() => {
    clearLocalNotification().then(setLocalNotification);
  },[]);
 
  useEffect(() => {
    if (score > 0)
    handleClick();
  },[score]);

  const handleClick = (e) => {
      const nextQuestion = questionIndex + 1;
      if (nextQuestion < cards.length) {
        setQuestionIndex(nextQuestion),
        setShowAnswer(false);
      } else {
        navigation.navigate('Results',
        { 
          cards: cards, 
          score: score,
          title: title, 
        })
    };
}

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  return(
    <ScrollView>
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text>Question {questionIndex + 1} out of {cards.length} </Text>
                <Text>Score {score} </Text>

            </View>
                <View style={styles.block}>
                <Text style={styles.quiz}>{cards[questionIndex].question}</Text>
                </View>
            {
            showAnswer && (
                <View style={styles.block}>
                <Text style={styles.quiz}>{cards[questionIndex].answer}</Text>
                </View>
          )}


            <View>
              <TouchableOpacity 
              onPress={toggleAnswer} 
              style={styles.showBtn}
              >
                  <Text>{showAnswer? "Hide Answer":" Show Answer"}</Text>
              </TouchableOpacity>
              </View>
            <View style={styles.buttonSection}>
              <TouchableOpacity 
              onPress={() => 
                setScore(score + 1)
              }
              style={styles.btn}>
                  <Text style={styles.btnText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => handleClick()} 
              style={styles.btn}>
                  <Text style={styles.btnText}>Incorrect</Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  )
} 

const styles = StyleSheet.create({

  container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },

  block: {
    margin: 20
  },

  title: {
      fontSize: 32,
      alignItems: 'center',
      margin: 20
  },

  buttonSection: {
    flexDirection:'row', 
    justifyContent:'space-between'
  },

  showBtn: {
      margin: 20,
      width: 100,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: '#4cb5ab',
  },
  btn: {
      margin: 20,
      width: 100,
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
  },

  quiz: {
    fontSize:20,
    textAlign:'left',
  }
});

const mapStateToProps = decks => ({ decks });

export default connect(mapStateToProps)(Quiz);