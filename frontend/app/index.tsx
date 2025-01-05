import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useUser } from '@/contexts/UserConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '@/components/Button';

const index = () => {
    const { user, setUser } = useUser()

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem("user")
            if (storedUser) {
                setUser(JSON.parse(storedUser))
                // router.push('./auth/success')
            }
        }
        fetchUser()
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