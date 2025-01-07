import React from 'react'
import CustomTextInput from '../CustomTextInput'

interface EmailInputProps {
  email: string;
  setEmail: (text: string) => void;
}

const EmailInput = ({ email, setEmail }: EmailInputProps) => {
  return (
    <CustomTextInput
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        value={email}
        placeholder="Email" 
        onChangeText={(text) => {setEmail(text)}}
    />
  )
}

export default EmailInput