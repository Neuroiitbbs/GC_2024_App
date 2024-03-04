import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import AnimatedLoader from "./InnerLoaderComponent";

const Loader = ({ visible, top, bottom, setModalVisible }) => {
  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="black"
      animationStyle={styles.lottie}
      speed={1}
      top={top}
      bottom={bottom}
      setModalVisible={setModalVisible}
      animationType={"fade"}
    >
      <Text>Loading...</Text>
    </AnimatedLoader>
  );
};

export default Loader;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
