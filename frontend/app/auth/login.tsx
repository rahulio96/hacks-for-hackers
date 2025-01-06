import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from '@/config/FirebaseConfig';
import { signInWithEmailAndPassword } from '@firebase/auth';
import CustomButton from '@/components/Button';

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const auth = FIREBASE_AUTH

    const signIn = async () => {
        setIsLoading(true)
        try {
            const existUser = await signInWithEmailAndPassword(auth, email, password)
            // router.push('./auth/success')
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput 
                style={styles.input} 
                value={email} placeholder="Email" 
                onChangeText={(text) => {setEmail(text)}}
            />
            <TextInput 
                style={styles.input} 
                value={password} placeholder="Password" 
                onChangeText={(text) => {setPassword(text)}}
            />
            {isLoading ? (<ActivityIndicator size="large" color="#0000ff"/>
                ) : (<CustomButton onPress={signIn} text="Log in"/>)}
            <CustomButton onPress={() => router.back()} text="Back"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 250,
        height: 40,
        margin: 12,
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
    },
})

export default login