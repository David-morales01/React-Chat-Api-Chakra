import React from 'react'
import {Box,useColorMode,useColorModeValue,Flex}from '@chakra-ui/react'; 
import { ColorModeSwitcher } from '../../ColorModeSwitcher'; 
import { HambugerIcon } from 'react-icons/fa';  
import ky from 'ky';
import {useEffect, useState} from 'react';
import ContactItem  from './ContactItem.js';
import useUser from '../../hooks/useUSer'

export default function ListContacts({fullView,contactClick}) {
  const { toggleColorMode } = useColorMode()
 const user = useUser(); 
 const bg = useColorModeValue('white', 'gray.800') ;
 const color = useColorModeValue('black', 'white') ;

 const [contacts, setContacts] = useState([]); 
 useEffect(()=> {
  const access_token = localStorage.getItem('access_token');
  (async function Lcotacts() {
      const resp = await ky.get(`${process.env.REACT_APP_API_URL}/contacts`, {  
          headers: {
              Authorization: `Bearer ${access_token}`
          },
      }).json(); 
      setContacts(resp.data);
  })();
}, []);
  return (
    
    <Box mw='900px' flex='1' p='4' borderLeftRadius='10' bg={bg} color={color} borderRightRadius={fullView ? '0' : '10'} border='1px solid gray'  borderRight={fullView ? '0px' : '1px solid gray'}>
      <Flex justifyContent='space-between'  alignItems='center'>
        <Box mb='60px' mt='40px' >Good Morning {user.name}</Box> 
        <Box>
          <ColorModeSwitcher justifySelf="flex-end" /> 
          </Box>
      </Flex>
          <Box>
            {
            contacts.map((item)=> {
              return (
                <ContactItem key={item.id} contact={item}  contactClick ={(item)=>contactClick(item)}></ContactItem>
              );
            })
          }
          </Box>
    </Box>
  )
  
  
}
