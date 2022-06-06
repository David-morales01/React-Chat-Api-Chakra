import React from 'react';
import {Text,Box,useColorModeValue} from '@chakra-ui/react'; 

export default function MessageSender(props) {
  
 const bg = useColorModeValue('blue.200', 'blue.500') ;
  return ( 
    <Box my='5' display='flex' justifyContent='end'>
      <Text bg={bg} borderRadius='20px' py='2' px='5'  marginInlineEnd='20px' >{props.text}</Text>
     </Box>
  )
}
