import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,Button } from 'react-native';

const LiveEvents = ({ navigation }) => {
  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Live Events</Text>
      <Text style={styles.subtitle}>Add or Update Live Events</Text>
       <Image source={require('../assets/liveEvent.png')} style={styles.logo}  />
      <View style={styles.buttonContainer}>
      <View style={[styles.buttonWrapper, {backgroundColor: '#0B0D11' }]}>
        <Button
          title="Add Live Event"
          onPress={() => navigation.navigate('AddLiveEvent')}
          style={styles.button}   color="#0B0D11"
        />
      </View>
      <View style={[styles.buttonWrapper, {backgroundColor: '#0B0D11' }]}>
        <Button
          title="Update Existing Live Event"
          onPress={() => navigation.navigate('UpdateLiveEvent')}
          style={styles.button}  color="#0B0D11"
        />
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000', // Black background color
    padding: 40,
  },
  logo: {
    width: 450,
    height: 320,
    resizeMode: 'contain',
    // marginBottom: 10,
    marginTop: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop:10,
    position: 'absolute',
    top: 0,
    left: 0,
    // backgroundColor: '#FF0000',
    padding: 30,
   color: '#D41D77',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'medium',
    color: 'gray',
    marginBottom: 30,
    marginTop: 20,
    position: 'absolute',
    top: 50,
    left: 0,
    // backgroundColor: '#FF0000',
    padding: 30,
    
  },
 buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  buttonWrapper: {
    marginBottom: 25,
    width: 320,
    height: 60,
     borderRadius: 15, // Set the border radius to make the button rounded
     overflow: 'hidden', // Ensure that the button content is clipped to the rounded border
     padding: 10,
    //  paddingVertical: 20, // Increased the height here
  },
  button: {
    // width: 200,
    height: 200,
    paddingVertical: 40,
    
    fontSize: 32,
  },
  
});

export default LiveEvents;