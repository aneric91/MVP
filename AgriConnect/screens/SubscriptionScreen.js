import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SubscriptionScreen = ({ navigation }) => {
  const handleSubscription = (plan) => {
    // Logique pour gérer le plan d'abonnement choisi (stockage, paiement, etc.)
    console.log(`Plan choisi : ${plan}`);
    // Redirige vers l'écran de paiement
    navigation.navigate('PaymentScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisir un Plan d'Abonnement</Text>
      <Button title="Plan Basique" onPress={() => handleSubscription('Basic')} />
      <Button title="Plan Standard" onPress={() => handleSubscription('Standard')} />
      <Button title="Plan Premium" onPress={() => handleSubscription('Premium')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default SubscriptionScreen;
