import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {QuerySnapshot} from 'firebase/firestore';

export default function RoomScreen({route, navigation}) {
  const {userId, otherParam} = route.params;
  console.log(userId, 'gdjsagdjasgjhsgajhgsgsahgdjhasgdhgashdggdjhgdjhasgdjh');

  const [messages, setMessages] = useState([
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true,
    },
    // example of chat message
    {
      _id: 1,
      text: 'Hello!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Test User',
      },
    },
  ]);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then(querySnapshot => {
        setMessages(querySnapshot.data().text);
      });
  }, []);

  // helper method that is sends a message
  function handleSend(newMessage = []) {
    console.log(newMessage);
    setMessages(GiftedChat.append(messages, newMessage));
    firestore()
      .collection('users')
      .doc(userId)
      .update({
        text: messages,
      })
      .then(res => {
        console.log(res, 'msgresponse');
        console.log(messages, 'showMessages');
        console.log(newMessage, 'showMessages');
      })
      .catch(err => {
        console.log(err, 'msgerror');
      });
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{id: 1, name: 'User Test'}}
      // renderBubble={renderBubble}
      placeholder="Type your message here..."
      showUserAvatar
      alwaysShowSend
      // renderSend={renderSend}
      // scrollToBottomComponent={scrollToBottomComponent}
      // Step 3: add the prop
      // renderLoading={renderLoading}
    />
  );
}
