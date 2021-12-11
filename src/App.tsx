import React, { useEffect, useState, CSSProperties, useRef } from 'react';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from 'mui-button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import { DataGrid } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

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
  const [alertStack, setAlertStack] = useState<any>({});
  const alertStackRef = useRef(alertStack);
  alertStackRef.current = alertStack;

  const [retailers, setRetailers] = useState<any[]>([]);
  const [dataDirPath, setDataDirPath] = useState(null);
  const [selectedRetailerCode, setSelectedRetailerCode] = useState<any>(null);
  const [startWeek, setStartWeek] = useState<any>('');
  const [endWeek, setEndWeek] = useState<any>('');
  const [isStartWeekValid, setStartWeekValid] = useState<any>(false);
  const [isEndWeekValid, setEndWeekValid] = useState<any>(false);
  const [isGfiFileLoaded, setGfiFileLoaded] = useState<any>(false);

  const [retailerGfiFiles, setRetailerGfiFiles] = useState<any[]>([]);

  const [selectedGfiFiles, setSelectedGfiFiles] = useState<any[]>([]);

  const columns = [
    { field: 'name', headerName: 'File Name', width: 210 },
    { field: 'size', headerName: 'MB', width: 60 },
    { field: 'week', headerName: 'Week', width: 70 },
    { field: 'version', headerName: 'Ver', width: 60 },
  ];

  ipcRenderer.on('dataDirPathSetted', (event: any, { dataDirPath, retailers }: any) => {
    setDataDirPath(dataDirPath);
    setRetailers(Object.values(retailers));
  });

  ipcRenderer.on('gfiFileSelected', (event: any, retailerGfiFiles: any) => {
    setRetailerGfiFiles(retailerGfiFiles);
  });

  let alertTimer: any;

  const pushAlertStack = (alert: any) => {
    let id = new Date().valueOf();
    setAlertStack({ ...alertStack, [id]: { ...alert, id } });

    setTimeout(() => {
      alertStackRef.current[id].isDisabled = false;
      setAlertStack({ ...alertStackRef.current });
    }, 100);
    setTimeout(() => {
      popAlertStack(id);
    }, 6000);

    // setTimeout(() => {
    //   delete alertStackRef.current[id];
    //   setAlertStack({ ...alertStackRef.current });
    //   console.log(id + '끝');
    // }, 6000);
  };

  const popAlertStack = (id: any) => {
    alertStackRef.current[id].isDisabled = true;
    setAlertStack({ ...alertStackRef.current });
  };

  useEffect(() => {
    console.log(alertStack);
  }, [alertStack]);

  useEffect(() => {
    setSelectedRetailerCode(null);
  }, [dataDirPath]);

  useEffect(() => {
    setStartWeek('');
    setEndWeek('');
  }, [selectedRetailerCode]);

  useEffect(() => {
    setStartWeekValid(/^(\d{4})$/.test(startWeek));
    setEndWeekValid(/^(\d{4})$/.test(endWeek));
  }, [startWeek, endWeek]);

  let selectGfiFileTimer: any;
  useEffect(() => {
    setRetailerGfiFiles([]);
    setGfiFileLoaded(false);
    clearTimeout(selectGfiFileTimer);
    if (isStartWeekValid && isEndWeekValid) {
      selectGfiFileTimer = setTimeout(() => {
        ipcRenderer.send('selectGfiFile', { selectedRetailerCode, startWeek, endWeek });

        setGfiFileLoaded(true);
      }, 500);
    }
  }, [isStartWeekValid, isEndWeekValid]);

  useEffect(() => {
    let temp: any[] = [];
    retailerGfiFiles.forEach((e: any) => {
      e.size = parseFloat((e.size / 1000000.0).toFixed(1));
      e.isDefault && temp.push(e.id);
    });
    setSelectedGfiFiles(temp);

    if (retailerGfiFiles.length && isGfiFileLoaded)
      pushAlertStack({
        isDisabled: true,
        severity: 'info',
        title: 'GFI found',
        description: `${retailerGfiFiles.length} items found during ${startWeek} ~ ${endWeek} in ${selectedRetailerCode}!`,
      });
    else if (!retailerGfiFiles.length && isGfiFileLoaded)
      pushAlertStack({
        isDisabled: true,
        severity: 'error',
        title: 'GFI not found',
        description: `Items not found during ${startWeek} ~ ${endWeek} in ${selectedRetailerCode}!`,
      });
  }, [retailerGfiFiles]);

  return (
    <ThemeProvider theme={lightTheme}>
      <div style={{ position: 'absolute', zIndex: 99, bottom: 0, right: '20px' }}>
        {Object.values(alertStack).map((e: any) => {
          return (
            <div style={{ margin: '2px' }}>
              <Collapse in={!e.isDisabled}>
                <Alert
                  variant='filled'
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={() => {
                        popAlertStack(e.id);
                      }}
                    >
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                  severity={e.severity}
                >
                  <AlertTitle>{e.title}</AlertTitle>
                  {e.description}
                </Alert>
              </Collapse>
            </div>
          );
        })}
      </div>
      <div className='App' style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
        <Box sx={{ width: '100vw', bgcolor: 'background.paper', color: 'text.primary' }}>
          <Tabs value={funcTabIdx} onChange={(e, i) => setFuncTabIdx(i)} centered>
            <Tab label='Merge GFI' />
            <Tab label='Item Two' />
            <Tab label='Item Three' />
          </Tabs>
        </Box>

        <Box sx={{ flex: 1, padding: 2, overflow: 'scroll', bgcolor: 'background.paper', display: 'flex' }}>
          <Box sx={{ flex: 0.7, padding: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <div>
              <Box sx={{ ...h1Style, marginTop: 0 }}>Select Data Directory</Box>
              <TextField
                defaultValue='click to set path'
                InputProps={{
                  readOnly: true,
                }}
                size='small'
                sx={{ width: '100%' }}
                onClick={() => ipcRenderer.send('setDataDirPath')}
                value={dataDirPath}
              />
            </div>

            <div style={{ ...(dataDirPath ? { ...enable } : { ...disable }) }}>
              <Box sx={h1Style}>Select Retailer</Box>
              <FormControl fullWidth>
                <InputLabel>Retailer</InputLabel>
                <Select
                  style={{}}
                  label='Retailer'
                  value={selectedRetailerCode}
                  size='small'
                  onChange={(e) => setSelectedRetailerCode(e.target.value)}
                >
                  {retailers.map((e) => {
                    return <MenuItem style={{ display: 'block', textAlign: 'center' }} value={e.code}>{`${e.code} - ${e.name} \n`}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </div>

            <div style={{ width: '100%', display: 'flex', height: '150px' }}>
              <div style={{ ...(selectedRetailerCode ? { ...enable } : { ...disable }), flex: 1, transition: 'opacity 1s' }}>
                <Box sx={h1Style}>Start Week</Box>
                <TextField
                  error={!isStartWeekValid && startWeek !== ''}
                  label='YYMM'
                  helperText={!isStartWeekValid && startWeek !== '' && 'Format must be YYMM'}
                  size='small'
                  style={{ width: '100%' }}
                  onChange={(e) => setStartWeek(e.target.value)}
                  value={startWeek}
                />
              </div>
              <div style={{ width: '20px' }} />
              <div style={{ ...(selectedRetailerCode ? { ...enable } : { ...disable }), flex: 1 }}>
                <Box sx={h1Style}>End Week</Box>
                <TextField
                  error={!isEndWeekValid && endWeek !== ''}
                  label='YYMM'
                  helperText={!isEndWeekValid && endWeek !== '' && 'Format must be YYMM'}
                  size='small'
                  style={{ width: '100%' }}
                  onChange={(e) => setEndWeek(e.target.value)}
                  value={endWeek}
                />
              </div>
            </div>

            <Button
              variant={isGfiFileLoaded && selectedGfiFiles.length ? 'contained' : 'outlined'}
              color={isGfiFileLoaded && selectedGfiFiles.length ? 'primary' : 'error'}
              style={{ ...(isGfiFileLoaded && selectedGfiFiles.length ? { ...enable } : { ...disable }), width: '100%' }}
              onClick={() => ipcRenderer.send('mergeGfiFiles', { selectedGfiFiles })}
            >
              Merge GFI Files
            </Button>
          </Box>

          <Divider sx={{}} orientation='vertical'></Divider>
          <Box sx={{ flex: 1, padding: 5, display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...(isGfiFileLoaded ? { ...enable } : { ...disable }), height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ ...h1Style, marginTop: 0 }}>Select GFI Files</Box>
              <div style={{ flex: 1, width: '100%', overflow: 'scroll' }}>
                <DataGrid
                  headerHeight={40}
                  rows={retailerGfiFiles}
                  columns={columns}
                  checkboxSelection
                  selectionModel={isGfiFileLoaded && selectedGfiFiles}
                  onSelectionModelChange={(e) => {
                    setSelectedGfiFiles(e);
                  }}
                  hideFooterPagination={true}
                  rowHeight={30}
                />
              </div>
            </div>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}

const h1Style: CSSProperties = { fontSize: 30, fontWeight: '600', color: 'text.primary', marginTop: 4, marginBottom: 2 };
const disable: CSSProperties = { pointerEvents: 'none', opacity: 0.2, transition: 'opacity 0.6s' };
const enable: CSSProperties = { pointerEvents: 'auto', opacity: 1, transition: 'opacity 0.6s' };

export default App;
