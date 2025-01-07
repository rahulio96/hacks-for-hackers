import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useUser } from "@/contexts/UserConfig";
import CustomButton from '@/components/CustomButton';
import { FIREBASE_AUTH } from '@/config/FirebaseConfig';
import { router } from 'expo-router';

const Home = () => {
  const { user, setUser } = useUser()
  useEffect(() => {
    console.log(user)
  }, [])

  const handleSignOut = async () => {
    setUser({
      uid: '',
      email: '',
      username: '',
    })
    await FIREBASE_AUTH.signOut()
    router.push('/')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.username}</Text>
      <CustomButton 
        onPress={handleSignOut}
        text="Sign out"
      />
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
      fontSize: 40,
      fontWeight: 'bold'
  },
})

export default Home