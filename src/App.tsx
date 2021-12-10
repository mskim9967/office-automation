import React, { useEffect, useState } from 'react';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const { ipcRenderer } = window.require('electron');

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const [funcTabIdx, setFuncTabIdx] = useState(0);

  const [inputDirPath, setInputDirPath] = useState(null);
  const [outputDirPath, setOutputDirPath] = useState(null);

  ipcRenderer.on('trigInputDirPath', (event: any, inputDirPath: any) => {
    setInputDirPath(inputDirPath);
  });

  ipcRenderer.on('trigOutputDirPath', (event: any, outputDirPath: any) => {
    setOutputDirPath(outputDirPath);
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='App' style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
        <Box sx={{ flexShrink: 0, width: '100vw', bgcolor: 'background.paper', color: 'text.primary' }}>
          <Tabs value={funcTabIdx} onChange={(e, i) => setFuncTabIdx(i)} centered>
            <Tab label='Merge GFI' />
            <Tab label='Item Two' />
            <Tab label='Item Three' />
          </Tabs>
        </Box>

        <Box sx={{ flexGrow: 1, padding: 5, bgcolor: 'background.paper', display: 'flex' }}>
          <Box sx={{ flexGrow: 1, border: 'solid red 3px', padding: 5 }}>
            <Box sx={{ fontSize: 30, fontWeight: '600', color: 'text.primary', marginBottom: 2 }}>Input Directory Path</Box>

            <TextField
              defaultValue='click to set path'
              InputProps={{
                readOnly: true,
              }}
              size='small'
              sx={{ width: '100%' }}
              onClick={() => ipcRenderer.send('setInputDirPath')}
              value={inputDirPath}
            />
          </Box>
          <Box sx={{ flexGrow: 1, border: 'solid red 3px', color: 'text.primary', padding: 5 }}>
            <Box sx={{ fontSize: 30, fontWeight: '600', color: 'text.primary', marginBottom: 2 }}>Output Directory Path</Box>

            <TextField
              defaultValue='click to set path'
              InputProps={{
                readOnly: true,
              }}
              size='small'
              sx={{ width: '100%' }}
              onClick={() => ipcRenderer.send('setOutputDirPath')}
              value={outputDirPath}
            />
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
