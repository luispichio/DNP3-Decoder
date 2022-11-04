import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import Axios from "axios";

export default function Index() {
  const [encodedContents, setEncodedContents] = React.useState('05641B44E803C8002357DCCD8140000A0200010C010181010101DA620101010181017134');
  const [decodedContents, setDecodedContents] = React.useState('');

  const handleChange = (event) => {
    setEncodedContents(event.target.value);
  };

  const decode = (content) => {
    console.log(content);
    //setEncodedContents(content);
    Axios.post('http://localhost:3000/decode', content, {
      headers: { 'content-type': 'text/plain' },
    })
      .then(function (response) {
        console.log(response);
        setDecodedContents(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const decodedList = (content) => {
    return (
      content && content.length > 0 && content.map((item) => (
        <Grid item xs={12}>
          <Box sx={{ width: '95%', wordBreak: 'break-all', whiteSpace: 'pre-line' }}>Line<br />{item.line.length < 300 ? item.line : item.line.substring(0, 300) + '...'}</Box>
          {item.decoded && item.decoded.length > 0 && item.decoded.map((item) => (
            <Grid item xs={12}>
              <Box sx={{ width: '95%', wordBreak: 'break-all' }}>Hex<br />{item.hex.length < 300 ? item.hex : item.hex.substring(0, 300) + '...'}</Box>
              <Box sx={{ width: '95%', wordBreak: 'break-all', whiteSpace: 'pre-line' }}>Decoded<br />{item.decoded}</Box>
            </Grid>
          ))}
          <Divider />
        </Grid>
      ))
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          DNP3 Analyser
        </Typography>
        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label="encoded(hex)"
              id="encodedContents"
              value={encodedContents}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined" onClick={() => { decode(encodedContents); }}>Analyze</Button>
          </Grid>
          {decodedList(decodedContents)}
        </Grid>
        <Copyright />
      </Box>
    </Container>
  );
}
