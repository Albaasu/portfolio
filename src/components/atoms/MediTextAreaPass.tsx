import { TextField } from '@mui/material';
import React from 'react';

const MediTextAreaPass = (props: any) => {
  const { value, sx } = props;

  return (
    <TextField
      sx={sx}
      margin='normal'
      required
      fullWidth
      name='password'
      label='パスワード'
      type='password'
      id='password'
      autoComplete='current-password'
      value={value}
      onChange={props.onChange}
    />
  );
};

export default MediTextAreaPass;
