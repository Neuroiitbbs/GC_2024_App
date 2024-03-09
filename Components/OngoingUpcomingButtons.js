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
    borderRadius: 8,
    marginTop: 0.005 * deviceHeight,
    overflow: "hidden",
    backgroundColor: "black",
    paddingTop: "0%",
    paddingHorizontal: "3%",
    elevation: 2,
    marginLeft: 14,
  },
  inactiveButton: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
    lineHeight: 35,
  },
  activeButton: {
    color: "#d41d77",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
    lineHeight: 30,
  },
  pressed: {
    opacity: 0.75,
    color: "#d41d77",
  },
  textContainer: {
    borderBottomWidth: 1,
  },
});
