import { View, Text, StyleSheet, Button } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useUser } from '@/contexts/UserConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = () => {
    const { user, setUser } = useUser()

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem("user")
            if (storedUser) {
                setUser(JSON.parse(storedUser))
                router.push('./auth/success')
            }
        }
        fetchUser()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to HackerPrep</Text>
            <Text style={styles.subText}>Improve your communication and interviewing skills</Text>
            <View style={styles.gap}/>
            <Text style={styles.subText}>Get started by signing up or logging in</Text>
            <Button title="Log in" onPress={() => router.push('./auth/login')}/>
            <Button title="Sign up" onPress={() => router.push('./auth/signup')}/>
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
    subText: {
        textAlign: 'center',
        fontSize: 20,
        margin: 20
    },
    gap: {
        margin: 40
    }
})

export default index