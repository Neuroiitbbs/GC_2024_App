import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Menu, Divider } from "react-native-paper"; // Import from react-native-paper
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const CustomHeader = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [currentField, setCurrentField] = useState("Sports");
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const setCurrentFieldHandler = (field) => {
    setCurrentField(field);
    closeMenu();
    navigation.navigate("EventsStack", { field: field });
  };
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={openMenu}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={styles.title}>{currentField} </Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<AntDesign name="upcircleo" size={24} color="white" />}
          >
            {currentField !== "Sports" && (
              <Menu.Item
                onPress={() => {
                  setCurrentFieldHandler("Sports");
                }}
                title="Sports"
              />
            )}
            <Divider />
            {currentField !== "Cultural" && (
              <Menu.Item
                onPress={() => {
                  setCurrentFieldHandler("Cultural");
                }}
                title="Cultural"
              />
            )}
            <Divider />
            {currentField !== "Tech" && (
              <Menu.Item
                onPress={() => {
                  setCurrentFieldHandler("Tech");
                }}
                title="Tech"
              />
            )}
          </Menu>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#111319",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 56,
    elevation: 4, // for Android
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
  },
  title: {
    fontSize: 15,
    color: "white",
    // fontWeight: "bold",
  },
});

export default CustomHeader;
