import React, {useState, useEffect} from 'react';
import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import { connect } from "react-redux";
/*import '../node_modules/react-spritz/build/main.css';*/
import '../utils/main.css';
// import { pleaseCSS } from 'css_npm_module';

import ReactSpritz from 'react-spritz';
var retext = require('retext')
var pos = require('retext-pos')
var keywords = require('retext-keywords')
var toString = require('nlcst-to-string')
var keyword_extractor = require("keyword-extractor");

function removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b)
};

function getKeywordPhrases(definition) {
    console.log("Keyphrasewords Topic Extraction Using Keyword_Extractor + Retext-Keywords")
    var _keywords = new Array();
    var _keyphrases = new Array();
    let filtered_words = []

    function contains_words(value) {
        if (value.split(" ").length > 1) {
            filtered_words.push(value)
        } else {
        }
    }

    function done(err, file) {
        if (err) throw err
        file.data.keywords.forEach(function (keyword) {
            _keywords.push(toString(keyword.matches[0].node))
        })

        file.data.keyphrases.forEach(function (phrase) {
            _keyphrases.push(phrase.matches[0].nodes.map(stringify).join(''))

            function stringify(value) {
                return toString(value)
            }
        })
    }

    retext()
        .use(pos) // Make sure to use `retext-pos` before `retext-keywords`.
        .use(keywords)
        .process(definition, done)

    var extraction_result = keyword_extractor.extract(definition,{
        language:"english",
        remove_digits: true,
        return_changed_case:true,
        remove_duplicates: false,
        return_chained_words:true,
        return_max_ngrams: 2

    });

    extraction_result.filter(contains_words);
    let keyphrasewords = removeDuplicates(filtered_words.concat(_keywords.concat(_keyphrases)));
    return keyphrasewords
}

function phrasesToFingerprint(keyphrasewords,definition){
    // loop through definition
    // per sentence keywords followed by sentence
    // append defintion
    // concat results with result.reverse
    // boom first fingerprint
    var fingerprint_array = [];
    var definition_array = definition.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")

    for (var j in definition_array ) {
        var _kwords = [];
        for (var i in keyphrasewords) {
            // all keywords in sentence
            if (definition_array[j].includes(keyphrasewords[i])) {
                _kwords.push(keyphrasewords[i])
            } else {
            }
        }
        _kwords = removeDuplicates(_kwords);
        for (var k in _kwords) {
            fingerprint_array.push(_kwords[k])
        }
        fingerprint_array.push(definition_array[j])
    }
    fingerprint_array.push(definition)
    return fingerprint_array
}

function definition2fingerprint(definition){
    console.log("Create knowledge fingerprint from definition and key words")

    // documents contain a list of definition(yes only one definition)
    // parses document into list of sentences
    // gets list of keywords and phrases
    // builds fingerprint aka reformatted structure of accelerated learning fingerprint
    let keyphrasewords = getKeywordPhrases(definition)
    let fingerprint_array = phrasesToFingerprint(keyphrasewords,definition)
    let fingerprint_array_reverse = [... fingerprint_array].reverse()
    let final_fingerprint = fingerprint_array.concat(fingerprint_array_reverse).join(' ')
    return final_fingerprint
}

// let fingerprint = definition2fingerprint(definition)

function Quiz(props) {
 
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showVocab, setShowVocab] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);
  const [showPhrasewords, setShowPhrasewords] = useState(false);
  const [showFingerprint, setShowFingerprint] = useState(false);
  const [showSpeedDefinition, setShowSpeedDefinition] = useState(false);
    // show vocab, definition, phrasewords, fingerprint

  const { navigation } = props;
  const { cards, title }= props.route.params;

  useEffect(() => {
    if (score > 0)
    handleClick();
  },[score]);

  const handleClick = (e) => {
      const nextQuestion = questionIndex + 1;
      if (nextQuestion < cards.length) {
        setQuestionIndex(nextQuestion),
        setShowVocab(false);
      } else {
        navigation.navigate('Results',
        { 
          cards: cards, 
          score: score,
          title: title, 
        })
    };
}

const toggleFingerprint = () => {
setShowFingerprint(!showFingerprint)
}
const togglePhrasewords = () => {
    setShowPhrasewords(!showPhrasewords)
}
const toggleDefinition = () => {
    setShowDefinition(!showDefinition)
}
const toggleVocab = () => {
    setShowVocab(!showVocab)
}
const toggleSpeedDefinition = () => {
    setShowSpeedDefinition(!showSpeedDefinition)
}
  return(
    <ScrollView>
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text>Question {questionIndex + 1} out of {cards.length} </Text>
                <Text>Score {score} </Text>
            </View>
            {
                showFingerprint && (
                    <View style={styles.container2}>
                        <ReactSpritz
                            text={definition2fingerprint(cards[questionIndex].question).repeat(100)}
                            wpm={500}
                            playing
                        />
                    </View>
                )}
            <View>
                <TouchableOpacity
                    onPress={toggleFingerprint}
                    style={styles.showBtn}
                ><Text>{showFingerprint? "Hide":" Fingerprint"}</Text>
                </TouchableOpacity>
            </View>
            {
                showPhrasewords && (
                    <View style={styles.container2}>
                        <Text style={styles.quiz}>{getKeywordPhrases(cards[questionIndex].question).join(", ")}</Text>
                    </View>
                )}
            <View>
                <TouchableOpacity
                    onPress={togglePhrasewords}
                    style={styles.showBtn}
                ><Text>{showPhrasewords? "Hide":" Phrasewords"}</Text>
                </TouchableOpacity>
            </View>
            {
                showSpeedDefinition && (
                    <View style={styles.container2}>
                        <ReactSpritz
                            text={cards[questionIndex].question.concat(' ').repeat(100)}
                            wpm={500}
                            playing
                        />
                    </View>
                )}
            <View>
                <TouchableOpacity
                    onPress={toggleSpeedDefinition}
                    style={styles.showBtn}
                ><Text>{showSpeedDefinition? "Hide":" SpeedDefinition"}</Text>
                </TouchableOpacity>
            </View>
            {
                showDefinition && (
                    <View style={styles.container2}>
                        <Text style={styles.quiz}>{cards[questionIndex].question}</Text>
                    </View>
                )}
            <View>
                <TouchableOpacity
                    onPress={toggleDefinition}
                    style={styles.showBtn}
                ><Text>{showDefinition? "Hide":" Definition"}</Text>
                </TouchableOpacity>
            </View>
            {
                showVocab && (
                    <View style={styles.block}>
                        <Text style={styles.quiz}>{cards[questionIndex].answer}</Text>
                    </View>
                )}


            <View>
                <TouchableOpacity
                    onPress={toggleVocab}
                    style={styles.showBtn}
                >
                    <Text>{showVocab? "Hide":" Show Vocab"}</Text>
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
    container2: {
        position: 'relative',
        maxWidth: 800,
        fontSize: 40,
        paddingTop:10,
        paddingBottom:10,
        paddingRight: 0,
        paddingLeft: 0,


    },
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