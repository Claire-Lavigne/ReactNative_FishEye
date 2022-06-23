import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import Form from "./Form";

const SmallModal = ({ buttonContent, photographerName }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modal}
            onPress={() => console.log("do nothing")}
            activeOpacity={1}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={styles.buttonClose}
                  onPress={() => setModalVisible(false)}
                >
                  X
                </Pressable>
                <Form photographerName={photographerName} />
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.button}>{buttonContent}</Text>
      </Pressable>
    </View>
  );
};

export default SmallModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    alignItems: "center",
    elevation: 5,
    backgroundColor: "#DB8876",
    borderRadius: 5,
    padding: 15,
    margin: 10,
  },
  modal: {
    maxWidth: 669,
    height: "fit-content",
  },
  buttonClose: {
    color: "#fff",
    width: 42,
    height: 42,
  },
  button: {
    width: 170,
    height: 69,
    color: "#fff",
    backgroundColor: "#911c1c",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 26,
    flex: 1,
    textAlign: "center",
  },
});
