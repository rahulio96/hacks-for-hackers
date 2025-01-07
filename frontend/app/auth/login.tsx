import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from '@/config/FirebaseConfig';
import { signInWithEmailAndPassword } from '@firebase/auth';
import CustomButton from '@/components/CustomButton';
import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const auth = FIREBASE_AUTH

    const signIn = async () => {
        setIsLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <EmailInput email={email} setEmail={setEmail}/>
            <PasswordInput password={password} setPassword={setPassword}/>
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
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
    },
})

export default login