import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Button,
  Pressable,
} from "react-native";
import { LoginContext } from "../store/LoginContext";
import { useContext } from "react";

const ModalComponent = ({ modalVisible, setModalVisible }) => {
  const LoginCtx = useContext(LoginContext);
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOverlayClick = () => {
    closeModal();
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };
  const logoutHandler = () => {
    console.log("logout");
    LoginCtx.logout();
  };
  const email = LoginCtx?.user?.email;
  const name = LoginCtx?.user?.displayName;
  const image =
    LoginCtx?.user?.photoURL ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8p7GfNOdWUuoaLYF6Ous6cvnUShb3HEDpQg5vXxdgAs50fnyuOyzGmqikWsI4VMk6z24&usqp=CAU";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
      onDismiss={closeModal}
    >
      <TouchableWithoutFeedback onPress={handleOverlayClick}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={handleModalClick}>
            <View style={styles.OutermodalContainer}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}
                  >
                    <View style={styles.name}>
                      <Text
                        style={{
                          color: "white",
                          paddingVertical: 10,
                          fontSize: 20,
                        }}
                      >
                        {name}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                        }}
                      >
                        {email}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{}}>
                  <Image
                    source={{
                      uri: image,
                      alt: "Profile Picture",
                    }}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                {/* <Button title="LOGOUT" onPress={logoutHandler}></Button> */}
                <Pressable onPress={logoutHandler}>
                  <View
                    style={{
                      backgroundColor: "#EE4266",
                      padding: 10,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>LOGOUT</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    minHeight: "50%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  OutermodalContainer: {
    width: "100%",
    minHeight: "50%",
    backgroundColor: "#9290C3",
    borderRadius: 20,
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  modalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // modalContent: {
  //   alignItems: "center",
  // },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});
