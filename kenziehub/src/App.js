import React from 'react';
import {
  ChakraProvider,
  Flex,
  FormControl,
  Input,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import Routes from './Routes';
import { ToastContainer,  } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { theme } from '../src/styles/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        
      />

      <ToastContainer />
      <Routes />
    </ChakraProvider>
  );
}

export default App;
