import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import firebase from 'firebase/app'; // Asegúrate de que 'firebase/app' está instalado
import 'firebase/auth'; // Asegúrate de que 'firebase/auth' está instalado

export default function LoginScreen() {
    const [email, setEmail] = useState(''); // Cambié el nombre de la variable para reflejar mejor que se espera un correo electrónico
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Si el email o la contraseña están vacíos, mostrar una alerta
        if (email === '' || password === '') {
            Alert.alert('Error', 'Por favor, introduce un email y una contraseña.');
            return;
        }

        // Lógica de inicio de sesión con Firebase
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Usuario logueado con éxito:', user.email);
                // Aquí puedes redirigir al usuario a otra pantalla
            })
            .catch(error => {
                // Manejo de errores de Firebase
                Alert.alert('Error de autenticación', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail} // Actualiza el estado con el correo electrónico ingresado
                keyboardType="email-address" // Añade el tipo de teclado para correos electrónicos
                autoCapitalize="none" // Evita la capitalización automática
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true} // Oculta la contraseña ingresada
                value={password}
                onChangeText={setPassword} // Actualiza el estado con la contraseña ingresada
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
});
