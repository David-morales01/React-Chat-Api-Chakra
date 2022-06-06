import React from 'react'; 
import {Flex,Box,Avatar,Text}from '@chakra-ui/react'; 
export default function ContactItem({contact,contactClick}) {
  

  return (
    <Flex onClick={()=>contactClick(contact)}  cursor='pointer' flexDirection='row' my='20px'  h='50px' alignItems='center' gap='20px'>
        <Avatar name ={contact.name} /> <Text>{contact.name}</Text>
    </Flex> 
  )
  

}
 