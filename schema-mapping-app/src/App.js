import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import DatabaseTable from './components/DatabaseTable';
import SchemaMapping from './components/SchemaMapping';
import OverrideButton from './components/OverrideButton';
import './App.css';

function App() {
  const [sourceColumns, setSourceColumns] = useState([]);
  const [targetColumns, setTargetColumns] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [override, setOverride] = useState(false);

  useEffect(() => {
    const savedSourceColumns = JSON.parse(localStorage.getItem('Source')) || [];
    const savedTargetColumns = JSON.parse(localStorage.getItem('Target')) || [];
    setSourceColumns(savedSourceColumns);
    setTargetColumns(savedTargetColumns);
  }, []);

  const handleSourceSubmit = (values) => {
    setSourceColumns([...sourceColumns, values]);
  };

  const handleTargetSubmit = (values) => {
    setTargetColumns([...targetColumns, values]);
  };

  const handleOverride = () => {
    setOverride(!override);
  };

  const handleNodeDelete = (deletedNodeId) => {
    // Update mappings or handle any other necessary logic
    const updatedMappings = mappings.filter((edge) => edge.source !== deletedNodeId && edge.target !== deletedNodeId);
    setMappings(updatedMappings);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box className="database-tables-container">
            <DatabaseTable title="Source" onSubmit={handleSourceSubmit} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="database-tables-container">
            <DatabaseTable title="Target" onSubmit={handleTargetSubmit} />
          </Box>
        </Grid>
        <Grid item xs={12} className="schema-mapping-container">
          <SchemaMapping
            mappings={mappings}
            override={override}
            sourceColumns={sourceColumns}
            targetColumns={targetColumns}
            onNodeDelete={handleNodeDelete}
          />
        </Grid>
      </Grid>
      <div style={{ position: 'absolute', top: '77px', right: '77px' }}>
        <OverrideButton onClick={handleOverride} />
      </div>
    </Container>
  );
}

export default App;

