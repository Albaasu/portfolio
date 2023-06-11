import { Button, SxProps } from '@mui/material';
import React, { MouseEvent } from 'react';
import { ReactNode } from 'react';

interface Props {
  sx?: SxProps;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLInputElement>) => Promise<void>;
}

const MediButton = (props: Props) => {
  return (
    <Button
      type='submit'
      fullWidth
      variant='outlined'
      sx={props.sx}
      onClick={() => props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default MediButton;
