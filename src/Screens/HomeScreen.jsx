import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {List, Divider} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {QuerySnapshot} from 'firebase/firestore';

export default function HomeScreen({navigation}) {
  const [threads, setThreads] = useState([]);

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    //const unsubscribe = await firestore().collection('Users').get();
    const unsubscribe = firestore()
      .collection('chats')
      .get()
      .then(querySnapshot => {
        let data = querySnapshot.docs.map(snapShot => snapShot.data());
        console.log(data, 'showData');
        setThreads(data);
      });
    // setThreads([...data]);

    // .onSnapshot(querySnapshot => {
    //   console.log(querySnapshot.docs, 'datashow');
    //   const threads = querySnapshot.docs.data.map(documentSnapshot => {
    //     return {
    //       _id: documentSnapshot.data().Id,
    //       // give defaults
    //       name: documentSnapshot.data().user.name,
    //       ...documentSnapshot.data(),
    //     };
    //   });
    //   console.log(querySnapshot, 'after');
    //   // debugger;

    //   setThreads(threads);
    //   console.log('threads==', threads);
    // });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item.Id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('HomePage', {thread: item})}>
            <List.Item
              title={item.user.name}
              description="Tap to Chat"
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
            <Text>{console.log(item, 'showItem')}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});
