import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import products from '../../requests/products';

const Landing = () => {
  // const { user, token } = useContext(AuthContext);
  // const userAction = {
  //   userId: user.id,
  //   token: token,
  // };


  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
      }}
    >

    </Box>
  );
};


export default Landing;
