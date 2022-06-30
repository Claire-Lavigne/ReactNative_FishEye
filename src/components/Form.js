import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Text,
  TextInput,
} from "react-native";

const Form = ({ photographerName, setModalVisible }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const sendForm = () => {
    console.log(firstname, lastname, email, message);
    setModalVisible(false);
  };
  return (
    <SafeAreaView>
      <Pressable
        style={styles.buttonClose}
        onPress={() => setModalVisible(false)}
      >
        <Image
          style={styles.cross}
          source={require("../../assets/cross.png")}
        />
      </Pressable>
      <Text style={styles.title}>Contactez-moi</Text>
      <Text style={[styles.title, styles.lastElt]}>{photographerName}</Text>
      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFirstname}
        value={firstname}
      />
      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        onChangeText={setLastname}
        value={lastname}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <Text style={styles.label}>Votre message</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMessage}
        value={message}
        multiline={true}
        numberOfLines={3}
      />
      <Pressable onPress={() => sendForm()}>
        <Text style={styles.button}>Envoyer</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Form;

const styles = StyleSheet.create({
  buttonClose: {
    position: "absolute",
    top: 10,
    right: 0,
    elevation: 10,
  },
  cross: {
    width: 30,
    height: 30,
  },
  title: {
    color: "black",
    fontWeight: "400",
    fontSize: 36,
    lineHeight: 47,
    marginRight: 45,
  },
  lastElt: {
    paddingBottom: 15,
  },
  label: {
    color: "#312E2E",
    fontWeight: "400",
    fontSize: 26,
    lineHeight: 37,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    fontWeight: "400",
    fontSize: 26,
    lineHeight: 37,
    padding: 5,
  },
  button: {
    width: 170,
    color: "#fff",
    backgroundColor: "#911C1C",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginVertical: 10,
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 26,
    textAlign: "center",
  },
});
