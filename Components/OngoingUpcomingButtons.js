import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";

function OngoingUpcomingButton({
  children,
  onPress,
  currentScreen,
  currentButton,
}) {
  return (
    <View>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
      >
        <View style={styles.textContainer}>
          <Text
            style={
              currentScreen === currentButton
                ? styles.activeButton
                : styles.inactiveButton
            }
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default OngoingUpcomingButton;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  buttonInnerContainer: {
    borderRadius: 10,
    marginTop: 0.033 * deviceHeight,
    overflow: "hidden",
    // backgroundColor: "white",
    width: 115,
    paddingTop: "0%",
    paddingHorizontal: "3%",
    elevation: 2,
    marginLeft: 14,
  },
  inactiveButton: {
    color: "white",
    fontSize: 16,
    textAlign: "center",

    lineHeight: 35,
  },
  activeButton: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    // textDecorationLine: "underline",
    backgroundColor: "#d41d77",
    lineHeight: 30,
    borderRadius: 40,
  },
  pressed: {
    opacity: 0.75,
    color: "#d41d77",
  },
  textContainer: {
    borderBottomWidth: 1,
  },
});
