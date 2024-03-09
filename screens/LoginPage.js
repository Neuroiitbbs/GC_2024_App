import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const Login = ({ authenticateUser, promptAsync }) => {
  const AdminLogin = () => {
    promptAsync();
  };
  const userLogin = () => {
    if (__DEV__) {
      console.log("Running in development mode");
      authenticateUser(true);
    } else {
      console.log("Running in production mode");
      promptAsync();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={AdminLogin} style={styles.topbtn}>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
            Admin
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logoBig} />
      </View>
      <View style={styles.poweredBy}>
        <Text style={styles.poweredByTextBig}>Powered By</Text>
        <Image
          source={require("../assets/Neuro.png")}
          style={styles.poweredByLogo}
        />
      </View>
      <View style={styles.bottombar}>
        <TouchableOpacity onPress={userLogin} style={styles.loginButton}>
          <Image
            source={require("../assets/Neuro.png")}
            style={{ width: 30, height: 30, marginRight: 100 }}
          />
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Login
          </Text>
        </TouchableOpacity>
        {/* <Text style={styles.forgotPassword}>Forgot Password?</Text> */}
        {/* {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 50,
  },
  topbtn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30, // Added for rounded corners
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  topbar: {
    alignItems: "flex-end",
    width: "100%",
    height: 50,
    paddingRight: 20,
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
  },
  logoBig: {
    width: 400,
    height: 400, // Increased size
    // Increased size
  },
  poweredBy: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  poweredByTextBig: {
    color: "white",
    marginRight: 5,
    fontSize: 20, // Increased font size
  },
  poweredByLogo: {
    width: 70,
    height: 70,
  },
  bottombar: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: "white",
    position: "absolute", // Positioned at the bottom
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Ensure it spans the whole width
    height: "25%",
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#25262c", // Example blue color
    padding: 10,
    borderRadius: 5,
    marginBottom: 10, // Added some margin at the bottom
    width: "90%", // Make the button wider
    alignItems: "center",
    justifyContent: "start",
    borderColor: "orange",
    borderWidth: 3,
  },
  forgotPassword: {
    color: "black",
    marginTop: 10,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
});

export default Login;
