import React from 'react';
import { Button } from '@mui/material';

const OverrideButton = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Override
    </Button>
  );
};

export default OverrideButton;
