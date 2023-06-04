import { TextField } from '@mui/material'
import React from 'react'

const MediTextArea = (props:any) => {
    const {name,value,type,label,id,autoComplete,sx} = props
    
  return (
    <TextField
    sx={sx}
    margin="normal"
    required
    fullWidth
    autoFocus
    name={name}
    label={label}
    type={type}
    id={id}
    autoComplete={autoComplete}
    value={value}
    onChange={props.onChange}
  />
  )
}

export default MediTextArea