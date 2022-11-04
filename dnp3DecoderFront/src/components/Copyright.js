import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <MuiLink color="inherit" href="https://github.com/luispichio/">https://github.com/luispichio/</MuiLink>
      {' | '}
      <MuiLink color="inherit" href="https://luispichio.github.io/">https://luispichio.github.io/</MuiLink>
    </Typography>
  );
}
