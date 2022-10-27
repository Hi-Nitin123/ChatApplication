import React, {useCallback, useState, useLayoutEffect, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import auth from '@react-native-firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  db,
} from 'firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .onSnapshot(querySnapshot => {
        const messages = [];

        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot, 'sdjsdfjhdsfjsjfsdjhasd');
          messages.push({
            ...documentSnapshot.data(),
            Id: documentSnapshot.data().Id,
            createdAt: documentSnapshot.data().createdAt.toDate(),
            Text: documentSnapshot.data().Text,
            user: documentSnapshot.data().user,
          });
        });

        setMessages(messages);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const signOutNow = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft: () => (
      //   <View style={{marginLeft: 20}}>
      //     <Image
      //       source={{
      //         uri: firestore.collection('chats').doc()
      //       }}
      //     />
      //   </View>
      // ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={signOutNow}>
          <Text>logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onSend = useCallback((messages = []) => {
    const {Id, createdAt, Text, user} = messages[0];

    debugger;
    firestore()
      .collection('chats')
      .add({
        Id: Id,
        createdAt: createdAt,
        Text: Text,
        user: user,
      })
      .then(() => {
        console.log('User added!');
      });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        Id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
};

export default ChatScreen;
