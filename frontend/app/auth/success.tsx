import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from "@/contexts/UserConfig";
import CustomButton from '@/components/Button';
import { FIREBASE_AUTH } from '@/config/FirebaseConfig';
import { router } from 'expo-router';

const success = () => {
  const { user, setUser } = useUser()

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
      <Text style={styles.title}>{user?.email}</Text>
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

export default success