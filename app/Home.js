import React, {useEffect, useState} from 'react';
import {
  View,
  Platform,
  Linking,
  Alert,
  Text
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AndroidOpenSettings from 'react-native-android-open-settings'

const App = () => {
  const [displayText, setDisplayText] = useState('Welcome to app')
  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        console.log(url)
      });
    } else {
      Linking.addEventListener('url', handleNavigation);
    }

    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if(state.isConnected &&  state.type === 'wifi') {
        alert('You are connected with wifi')
      } else {
        Alert.alert(
          'Alert',
          'You need to check your wifi setting',
          [
            {text: 'Open Setting', onPress: () =>  (Platform.OS === 'ios') ? Linking.openSettings() : AndroidOpenSettings.wifiSettings()},
            {text: 'Cancel', onPress: () => {}, style: 'cancel'},
          ],
          {cancelable: false},
        );
      }
    });
    return () => {
      Linking.removeEventListener('url', handleNavigation);
    }
  }, [])
  const handleNavigation = (event) => {
    setDisplayText('Welcome to app from URL')
    console.log(event)
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{displayText}</Text>
    </View>
  );
};

export default App;
