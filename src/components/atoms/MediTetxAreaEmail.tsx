import { TextField } from '@mui/material';
import React from 'react';

const MediTextAreaEmail = (props: any) => {
  const { value, autoComplete, sx } = props;

  return (
    <TextField
    sx={sx}
    margin="normal"
    required
    fullWidth
    autoFocus
    name="email"
    label="メールアドレス"
    type="email"
    id="email"
    autoComplete="current-email"
    value={value}
    onChange={props.onChange}
    />
  );
};


export default MediTextAreaEmail;
