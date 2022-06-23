import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, TextInput } from "react-native";

const Form = ({ photographerName }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <View style={styles.centeredView}>
      <SafeAreaView>
        <Text style={styles.title}>Contactez-moi</Text>
        <Text style={styles.title}>{photographerName}</Text>
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
        <TextInput style={styles.input} onChangeText={setEmail} value={email} />
        <Text style={styles.label}>Votre message</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
        />
      </SafeAreaView>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  form: {},
});
