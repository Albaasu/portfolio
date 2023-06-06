import { TextField } from '@mui/material'
import React from 'react'
import { auth } from '../../../firebase'

const MediTextArea = (props:any) => {
  const user = auth.currentUser
    const {name,value,type,label,id,sx} = props
    

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
    id={id}
    autoComplete={`current-${props.type}`}
    value={value}
    onChange={props.onChange}
  />
  )
}

export default MediTextArea