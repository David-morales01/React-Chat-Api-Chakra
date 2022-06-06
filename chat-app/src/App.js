import {Routes, Route} from 'react-router-dom'; 
import {ChakraProvider, theme }from '@chakra-ui/react';  
import Home from './components/Home.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';    

function App() {
  
  return ( 
     
    <ChakraProvider theme={theme}>
      <Routes>
        <Route element ={<Home/>} path="/" />
        <Route element ={<Login />} path="login" />
        <Route element ={<Register />} path="register" /> ,,
      </Routes>
    </ChakraProvider>  
  );
}

export default App;
