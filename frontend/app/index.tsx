import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useUser } from '@/contexts/UserConfig';
import CustomButton from '@/components/CustomButton';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/config/FirebaseConfig';
import axios from 'axios';

const index = () => {
    const { user, setUser } = useUser()
    const [uid, setUid] = useState('')

    // Check if the user is logged in
    useEffect(() => {
        // Pull from AsyncStorage
        const unsub = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
            if (user) {

                // Set the uid
                const uid = user.uid
                setUid(uid)
                
                // Fetch the user info from postgres db
                const response = await axios.post(
                    "http://10.0.2.2:8000/getuser", 
                    { uid },
                    { headers: { "Content-Type": "application/json"} } 
                )
                
                const userData = {
                    uid: response.data.uid,
                    email: response.data.email,
                    username: response.data.username,
                }

                // Set the user in the context so it can be used accross the app
                setUser(userData)
                console.log("ALREADY LOGGED IN")
                router.push('/auth/success')
            }
        })
        return () => unsub()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.titlePurple}>HackerPrep</Text>
            <Text style={styles.subText}>Improve your communication and interviewing skills</Text>
            <View style={styles.gap}/>
            <CustomButton onPress={() => router.push('./auth/login')} text="Log in"/>
            <CustomButton onPress={() => router.push('./auth/signup')} text="Sign up"/>
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
        fontWeight: 'bold'
    },
    titlePurple: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#9966CC'
    },
    subText: {
        textAlign: 'center',
        fontSize: 20,
        margin: 20
    },
    gap: {
        margin: 40
    },
    button: {
        margin: 20,
        width: 250,
        backgroundColor: 'lightblue',
        padding: 15,
    }
})

export default index