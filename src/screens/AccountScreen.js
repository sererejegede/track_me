import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
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
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View>
        <Text h2>AccountScreen</Text>
        <Text h4>{user.name}</Text>
        <Button title="Sign out" onPress={signout} />
        {/* <Button title="Test" onPress={getUserDetails} /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
