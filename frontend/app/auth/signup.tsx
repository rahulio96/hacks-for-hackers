import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from '@/config/FirebaseConfig';
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import axios from "axios";
import { useUser } from "@/contexts/UserConfig";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from '@/components/Button';

const signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const auth = FIREBASE_AUTH
    const { user, setUser } = useUser()

    const signUp = async () => {
        setIsLoading(true)
        try {
            // create user in firebase
            const newUser = await createUserWithEmailAndPassword(auth, email, password)

            // get the token from firebase
            const token = await newUser.user.getIdToken()

            // send token to backend
            const response = await axios.post(
                "http://10.0.2.2:8000/login", 
                { token }, 
                { headers: { "Content-Type": "application/json"} }
            )

            const userData = {
                uid: response.data.uid,
                email: response.data.email || "",
                username: response.data.username || "",
            }

            setUser(userData);

            router.push('./success')

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput 
                style={styles.input} 
                value={email} placeholder="Email" 
                onChangeText={(text) => {setEmail(text)}}
            />
            <TextInput 
                style={styles.input} 
                value={password} 
                placeholder="Password" 
                onChangeText={(text) => {setPassword(text)}}
            />
            { isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                    ) : (
                    <CustomButton onPress={signUp} text="Create Account"/> )
            }
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

export default signup 