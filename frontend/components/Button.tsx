import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface props {
    onPress: () => void;
    text: string;
}

const CustomButton = ({ onPress, text } : props) => {
  return (
    <TouchableOpacity 
        style={styles.button}
        onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        margin: 20,
        width: 250,
        backgroundColor: '#9966CC',
        padding: 15,
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold', 
    }
})

export default CustomButton