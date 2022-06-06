import React from 'react';
import {Box,useColorModeValue,Flex,Grid,GridItem,Text,Input,Button,FormControl} from '@chakra-ui/react'; 
import { FastField, Form, Formik, FormikBag} from 'formik';
import ky from 'ky';
import {useEffect, useState} from 'react';
import MessageSender from './MessageSender.js';
import MessageReceiver from './MessageReceiver.js';
import useUser from '../../hooks/useUSer';
import {buildFormikErrors} from '../../utils/build-formik-errors.js'; 
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher= require('pusher-js');
window.Echo = new Echo({
  broadcaster : "pusher",
  key : "425cb464445a991f099e", 
  cluster : "us2",
  forceTLS:true
});

function MessageList({contact,fullView}) {
  
 const bg = useColorModeValue('white', 'gray.800') ;
 const bg2 = useColorModeValue('gray.100', 'gray.200') ;
 const color = useColorModeValue('black', 'white') ;
 const colorText = useColorModeValue('black', 'white') ; 
 const [chats, setChats] = useState([]);
 let id = 0;
 
 const user = useUser();  
 if (contact){
    id = contact.id;
 } 
 useEffect(()=>{
  const eventName =`.chatsent-${[user.id,id].sort().join('-')}`;
  const channel = window.Echo.channel('chat');
  channel.listen(eventName,(e)=>{
    setChats(chats =>([...chats, e.message]));

  });
  return ()=> {
    channel.stopListening('eventName')
    window.Echo.leaveChannel('chat')
  }
},[user,id]);
 useEffect(()=> {
  const access_token = localStorage.getItem('access_token');
  (async function privatChats () {
      if(id){
        const resp = await ky.get(`${process.env.REACT_APP_API_URL}/messages/${id}`, {  
          headers: {
              Authorization: `Bearer ${access_token}`
          },
      }).json(); 
      setChats(resp.data);  
      }
       
  })();
}, [id]);
if(!contact){
return(
  <Box flex='2'  color={color} borderLeftRadius={fullView ? '0' : '10'} borderRightRadius='10'  border='1px solid gray'>
    
  <Flex justifyContent='center' h='100%' alignItems='center'>
    Gatra Message
  </Flex>
  </Box>
)
}
 if(contact){
  return (
    <Box flex='2' overflow='hidden' color={color} borderLeftRadius={fullView ? '0' : '10'} borderRightRadius='10'  border='1px solid gray'>
      <Grid  position='relative' h='100%' templateRows='60px auto 60px' >
        <GridItem w='100%' bg={bg} p='4' alignItems='center' >  <Text>{contact.name}</Text></GridItem>
        <GridItem >
          {
            chats.map((item)=>{  
                if(item.receiver_id == id){
                  return (
                <MessageReceiver key={item.id} text={item.text}></MessageReceiver>);
                }else{
                return (<MessageSender key={item.id} text={item.text}></MessageSender>);
                } 
            })
          }

        </GridItem>
        <GridItem w='100%' bg={bg} px='2'>
        <Formik
        initialValues={{ 
          sender_id: user.id, 
          receiver_id: contact.id, 
          text:'', 
         }}

         validate={(valores)=>{
          let errores =[]; 
          if(!valores.text){ 
           errores.text='text';
          } 
           return errores;
         }}

        onSubmit={handleSubmit}
        
        >
          {({errors,touched,handleSubmit})=> (
          <Form onSubmit={handleSubmit}>
            <Flex bg={bg} borderRadius='50px' gap='10px' py='1' px='2' alignItems='center'>
              <Box px='1'>
                icon
              </Box>
              <Box width='100%'>
                <FormControl> 
                  <FastField name="text"> 
                  {({field,meta})=>(<Input variant='unstyled' width='auto'  placeholder='Type your Message Here ...'  type='text' {...field} autoComplete='off' />)}
                  </FastField>  
                </FormControl> 
              </Box>
            <Box>
              <Button type='submit' borderRadius='50px'  variant='outline'>e</Button>
            </Box>
            </Flex> 
          </Form>
          )}
        </Formik>
        </GridItem>
      </Grid>
    </Box>
  )
  
 }
  async function handleSubmit(values, formikBag) {
     
    const resp = await ky
      .post(`${process.env.REACT_APP_API_URL}/messages`, {
        json: values
      })
      .json(); /*
      console.log(resp.data)
      console.log(resp)
      console.log('listo')/*
    if (resp.errors) {
      let errors = buildFormikErrors(resp.errors)

      formikBag.setErrors(errors)

      return
    } */ 
      setChats([...chats, resp.data]);  
      values.text='';
  }
}

export default MessageList