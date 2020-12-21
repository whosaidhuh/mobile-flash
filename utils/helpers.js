import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcard:notifications'
const CHANNEL_ID = 'DailyReminder'


export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
      Notifications.cancelAllScheduledNotificationsAsync
    );
  }

function createNotification () {
    return {
      title: 'Mobile Flashcards Reminder',
      body: "👋 Don't forget to quiz yourself today!",
      ios: {
        sound: true,
      },
      android: {
        channelId: CHANNEL_ID,
        sticky: false,
      }
    }
  }

  function createChannel() {
    return {
      name: 'Daily Reminder',
      description: 'Hye, this is your daily reminder to check your flashcards.',
      sound: true,
      priority: 'high'
    };
  }
  
  export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then(data => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
                .then(val => console.log('channel return:', val))
                .then(() => {
                  Notifications.cancelAllScheduledNotificationsAsync();
  
                  const tomorrow = new Date();
                  tomorrow.setTime(tomorrow.getTime() + 2 * 60000);
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  tomorrow.setHours(7);
                  tomorrow.setMinutes(0);
  
                  Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                      time: tomorrow,
                      repeat: 'day'
                    }
                  );
  
                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                })
                .catch(err => {
                  console.log('error', err);
                });
            }
          });
        }
      });
  }