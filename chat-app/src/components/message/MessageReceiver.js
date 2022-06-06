import React from 'react';
import {Text,Box,useColorModeValue} from '@chakra-ui/react'; 

export default function MessageSReceiver(props) { 
 const bg = useColorModeValue('white', 'gray.500') ;
  return ( 
    <Box my='5' display='flex' justifyContent='start'>
      <Text bg={bg} borderRadius='20px' py='2' px='5'  marginInlineStart='20px' >{props.text}</Text>
     </Box>
  )
}
