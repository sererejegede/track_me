import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Image } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { atob } from '../utilities/Base64';

const AccountScreen = () => {
  const { state, signout } = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => getUserDetails(), []);

  const getUserDetails = () => {
    setUser(
      JSON.parse(
        atob(
          state.token
            .split('.')[1]
            .replace('-', '+')
            .replace('_', '/')
        )
      )
    );
  };

  return (
    // <SafeAreaView forceInset={{ top: 'always' }}>
    <View style={styles.container}>
      {/*<Text h2>AccountScreen</Text>*/}
      <View style={styles.sub_container}>
        <Image source={require('../../assets/dp.png')} containerStyle={styles.avatar}/>
        <Text style={styles.userName}>{user.name}</Text>
        <Button buttonStyle={styles.button} title="Sign out" onPress={signout}/>
      </View>
      {/* <Button title="Test" onPress={getUserDetails} /> */}
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  debug: {
    borderWidth: 1,
    borderColor: 'black'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sub_container: {
    // borderWidth: 1,
    // borderColor: 'black',
    flex: 1,
    marginBottom: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 200,
    height: 200,
    // borderWidth: 1,
    // borderColor: '#CE7B91',
    padding: 5
  },
  button: {
    width: 100,
    borderRadius: 50,
    backgroundColor: '#CE7B91'
  },
  userName: {
    fontSize: 22,
    fontWeight: '500',
    paddingVertical: 20
  }
});

export default AccountScreen;
