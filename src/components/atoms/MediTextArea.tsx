import { SxProps, TextField } from '@mui/material'
import React from 'react'
import { auth } from '../../../firebase'

interface Props {
  type: string 
  sx?: SxProps
  label?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const MediTextArea = (props:Props) => {
  const user = auth.currentUser
    const {type,sx} = props

  return (
    <TextField
    sx={sx}
    margin="normal"
    required
    fullWidth
    autoFocus
    name={props.type ==="email" ? "email" : props.type ==="password" ? "password" : ""}
    label={props.type ==="email" ? "メールアドレス" : props.type ==="password" ? "パスワード" : user?.displayName }
    type={type}
    autoComplete={`current-${props.type}`}
    onChange={props.onChange}
  />
  )
}

export default MediTextArea