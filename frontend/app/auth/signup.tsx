import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from '@/config/FirebaseConfig';
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import axios from "axios";

const signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const auth = FIREBASE_AUTH

    const signUp = async () => {
        setIsLoading(true)
        try {
            // create user in firebase
            const user = await createUserWithEmailAndPassword(auth, email, password)

            // get the token from firebase
            const token = await user.user.getIdToken()

            // send token to backend
            const response = await axios.post(
                "http://10.0.2.2:8000/login", 
                { token }, 
                { headers: { "Content-Type": "application/json"} }
            )
            router.push('./success')

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <View style={styles.container}>
        <Text>Sign Up</Text>
        <TextInput style={styles.input} value={email} placeholder="Email" onChangeText={(text) => {setEmail(text)}}/>
        <TextInput style={styles.input} value={password} placeholder="Password" onChangeText={(text) => {setPassword(text)}}/>
        {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : <Button title="Create Account" onPress={signUp}/>}
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

export default signup 