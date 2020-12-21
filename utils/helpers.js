import React from 'react';
import { AsyncStorage } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcard:notifications'


export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
      Notifications.cancelAllScheduledNotificationsAsync
    );
  }
  
  export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then(() => {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {

                  Notifications.cancelAllScheduledNotificationsAsync();
                  
                  Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldPlaySound: true,
                        shouldShowAlert: true,
                        shouldSetBadge: false
                    })
                  })

                  let tomorrow = new Date()
                  tomorrow = tomorrow.getTime() + (1000*10);
                  let notificationDate = new Date(tomorrow)
                  console.log('date', notificationDate);

                  Notifications.scheduleNotificationAsync({
                    content: {
                      title: 'Mobile Flashcards Reminder',
                      body: "👋 Don't forget to quiz yourself today!",
                    },
                    trigger: notificationDate
                  });
  
                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                console.log(status)
                }
          })
      });
    }