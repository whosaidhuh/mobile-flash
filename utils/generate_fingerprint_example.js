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

function phrasesToFingerprint(keyphrasewords){
    // loop through definition
    // per sentence keywords followed by sentence
    // append defintion
    // concat results with result.reverse
    // boom first fingerprint
    var fingerprint_array = [];
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
        for (k in _kwords) {
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
    definition_array = definition.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")
    keyphrasewords = getKeywordPhrases(definition)
    fingerprint_array = phrasesToFingerprint(keyphrasewords)
    fingerprint_array_reverse = [... fingerprint_array].reverse()
    final_fingerprint = fingerprint_array.concat(fingerprint_array_reverse).join(' ')
    return final_fingerprint
}
var definition = ['A statistical way of comparing two (or more) techniques, ' +
'typically an incumbent against a new rival. ' +
'A/B testing aims to determine not only which technique' +
' performs better but also to understand whether the difference ' +
'is statistically significant. A/B testing usually ' +
'considers only two techniques using one measurement, ' +
'but it can be applied to any finite number of techniques ' +
'and measures. The fraction of predictions that a' +
'classification model got right. In multi-class classification, ' +
'accuracy is defined as follows: In binary classification, ' +
'accuracy has the following definition: See true positive ' +
'and true negative.', `In reinforcement learning, the mechanism by
                     which the agent transitions between states of the environment. 
                     The agent chooses the action by using a policy.`,`A function 
                     (for example, ReLU or sigmoid) that takes in the weighted sum of 
                     all of the inputs from the previous layer and then generates 
                     and passes an output value (typically nonlinear) to the next layer.`][0]

keyphrasewords = getKeywordPhrases(definition)
fingerprint = definition2fingerprint(definition)
console.log(fingerprint)
console.log(keyphrasewords)


