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

const SmallModal = ({ photographerName }) => {
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
            <Form
              photographerName={photographerName}
              setModalVisible={setModalVisible}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
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
    position: "relative",
    alignItems: "center",
    elevation: 5,
    backgroundColor: "#DB8876",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxWidth: 669,
  },
  button: {
    width: 170,
    color: "#fff",
    backgroundColor: "#911c1c",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 26,
    textAlign: "center",
  },
});
