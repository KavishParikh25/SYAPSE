import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const DatabaseTable = ({ title, onSubmit }) => {
  const [columnName, setColumnName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ columnName });
    setColumnName('');
  };

  return (
    <div>
      <h3>{title} Columns</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label={`${title} Column Name`}
          variant="outlined"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: '10px' }}
        >
          Add {title} Column
        </Button>
      </form>
    </div>
  );
};

export default DatabaseTable;
