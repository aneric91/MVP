import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => (
    <View style={styles.container}>
        <Image 
            source={{ uri: 'https://example.com/your-image.jpg' }} // Remplacez par l'URL de votre image
            style={styles.backgroundImage}
        />
        <View style={styles.overlay}>
            <Text style={styles.title}>Welcome to AgriConnect!</Text>
            <Text style={styles.subtitle}>Your gateway to modern agriculture.</Text>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.3,
    },
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

export default HomeScreen;
