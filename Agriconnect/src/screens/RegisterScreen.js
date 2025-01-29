import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const InscriptionForm = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [idCard, setIdCard] = useState("");
  const [incomeProof, setIncomeProof] = useState(null);

  // Validation de la carte d'identité béninoise
  const validateIdCard = (id) => {
    return /^[0-9]{13}$/.test(id);
  };

  // Fonction pour choisir une image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIncomeProof(result.assets[0]);
    }
  };

  // Gestion de l'inscription
  const handleSubmit = () => {
    if (!validateIdCard(idCard)) {
      Alert.alert("Erreur", "Le numéro de carte d'identité doit contenir 13 chiffres.");
      return;
    }
    Alert.alert("Succès", "Inscription réussie !");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Formulaire d'inscription</Text>

      {/* Nom complet */}
      <TextInput
        placeholder="Nom complet"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />

      {/* Date de naissance */}
      <TextInput
        placeholder="Date de naissance (JJ/MM/AAAA)"
        value={dob}
        onChangeText={setDob}
        style={styles.input}
      />

      {/* Numéro de téléphone */}
      <TextInput
        placeholder="Numéro de téléphone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      {/* Adresse */}
      <TextInput
        placeholder="Adresse"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />

      {/* Ville */}
      <TextInput
        placeholder="Ville"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      {/* Département */}
      <TextInput
        placeholder="Département"
        value={department}
        onChangeText={setDepartment}
        style={styles.input}
      />

      {/* Numéro de carte d'identité */}
      <TextInput
        placeholder="Numéro de carte d'identité"
        value={idCard}
        onChangeText={setIdCard}
        keyboardType="numeric"
        maxLength={13}
        style={styles.input}
      />

      {/* Justificatif de revenus */}
      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Text style={{ color: "white" }}>Télécharger le justificatif de revenus</Text>
      </TouchableOpacity>
      {incomeProof && (
        <Text style={{ marginTop: 5, textAlign: "center" }}>
          {incomeProof.uri.split("/").pop()}
        </Text>
      )}

      <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
        Soumettre l'inscription
      </Button>
    </View>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
  },
};

export default InscriptionForm;
