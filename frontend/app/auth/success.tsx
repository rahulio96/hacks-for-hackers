import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from "@/contexts/UserConfig";

const success = () => {
  const { user, setUser } = useUser()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.email}</Text>
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