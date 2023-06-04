import { Button } from '@mui/material';
import React from 'react';

const MediButton = (props: any) => {
  const { children ,sx} = props;

  return (
    <Button
      type='submit'
      fullWidth
      variant='outlined'
      sx={sx}
      onClick={props.onClick}
    >
      {children}
    </Button>
  );
};

export default MediButton;
