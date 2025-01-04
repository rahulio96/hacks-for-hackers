import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from '@/config/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const auth = FIREBASE_AUTH

    const signIn = async () => {
        setIsLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            router.push('./success')
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <View style={styles.container}>
        <Text>Login</Text>
        <TextInput style={styles.input} value={email} placeholder="Email" onChangeText={(text) => {setEmail(text)}}/>
        <TextInput style={styles.input} value={password} placeholder="Password" onChangeText={(text) => {setPassword(text)}}/>
        {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : <Button title="Log In" onPress={signIn}/>}
        <Button title="Back" onPress={() => {router.back()}}/>
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
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
})

export default login