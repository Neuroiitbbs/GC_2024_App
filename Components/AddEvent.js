import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const AddEvent = ({ navigation }) => {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        gap: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        ADD EVENT
      </Text>
      <View>
        <Button title="Cult./Tech." onPress={() => console.log("tech")} />
      </View>
      <View>
        <Button title="Sports" onPress={() => console.log("sport")} />
      </View>
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({});
