import { SxProps, TextField } from '@mui/material'
import React from 'react'
import { auth } from '../../../firebase'

interface Props {
  type?: string 
  sx?: SxProps
  label?: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const MediTextArea = (props:Props) => {
  const user = auth.currentUser


  return (
    <TextField
    sx={props.sx}
    margin="normal"
    value={props.value}
    required
    fullWidth
    autoFocus
    name={props.type ==="email" ? "email" : props.type ==="password" ? "password" : ""}
    label={props.type ==="email" ? "メールアドレス" : props.type ==="password" ? "パスワード" : user?.displayName ?user?.displayName : "ユーザー名"}
    type={props.type}
    autoComplete={`current-${props.type}`}
    onChange={props.onChange}
  />
  )
}

export default MediTextArea