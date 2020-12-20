import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DeckList from '../components/DeckList';
import DeckInfo from '../components/DeckInfo';
import AddCard from '../components/AddCard';
import Quiz from '../components/Quiz';
import Results from '../components/Results';

const QuizStack = createStackNavigator();

export default function QuizStackNavigator() {
    return (
        <QuizStack.Navigator>
            <QuizStack.Screen name="Deck List" component={DeckList} />
            <QuizStack.Screen name="Deck Info" component={DeckInfo} />
            <QuizStack.Screen name="Add Card" component={AddCard} />
            <QuizStack.Screen name="Start Quiz" component={Quiz} />
            <QuizStack.Screen name="Results" component={Results} />
        </QuizStack.Navigator>
    );
  }