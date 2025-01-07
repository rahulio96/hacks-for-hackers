import React from 'react'
import CustomTextInput from '../CustomTextInput'

interface PasswordInputProps {
  password: string;
  setPassword: (text: string) => void;
}

const PasswordInput = ({ password, setPassword }: PasswordInputProps) => {
  return (
    <CustomTextInput
        secureTextEntry={true}
        value={password}
        placeholder="Password" 
        onChangeText={(text) => {setPassword(text)}}
    />
  )
}

export default PasswordInput