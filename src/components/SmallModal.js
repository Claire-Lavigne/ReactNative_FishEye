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

const SmallModal = ({name}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.center}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.center}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modal}
            onPress={null}
            activeOpacity={1}
          >
            <Form setModalVisible={setModalVisible} name={name} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.buttonWrapper}
      >
        <Text style={styles.button}>Contactez-moi</Text>
      </Pressable>
    </View>
  );
};

export default SmallModal;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    elevation: 5,
    justifyContent: "flex-end",
    backgroundColor: "#DB8876",
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: "100%",
    height: "100%",
    maxWidth: 669,
  },
  buttonWrapper: {
    flex: 1,
    width: "100%",
  },
  button: {
    color: "#fff",
    backgroundColor: "#911c1c",
    paddingVertical: 25,
    fontWeight: "700",
    fontSize: 26,
    textAlign: "center",
  },
});
