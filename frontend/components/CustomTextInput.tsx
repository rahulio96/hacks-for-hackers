import { TextInput, TextInputProps } from 'react-native'
import React from 'react'

interface CustomTextInputProps extends TextInputProps {
  [key: string]: any;
}

const CustomTextInput = ({...props} : CustomTextInputProps) => {
  return (
    <TextInput
      {...props}
      style={[
        {width: 250},
        {height: 40},
        {margin: 12},
        {marginTop: 20},
        {borderWidth: 1},
        {padding: 10},
        {fontSize: 16},
        props.style
      ]}
    />
  )
}

export default CustomTextInput