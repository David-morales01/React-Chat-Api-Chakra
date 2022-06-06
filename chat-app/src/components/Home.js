import React from 'react';
import {Flex,useMediaQuery,Spinner,useColorModeValue} from '@chakra-ui/react';
import ListContacts from './contact/ListContacts.js';
import Textmessages from './message/MessageList.js'; 
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ky from 'ky';
import UserContext from '../context/UserContext.js';

export default function Home() {
  //const theme = true ;
 const bgBody = useColorModeValue('gray.50', 'black') ;
  const [fullView] = useMediaQuery('(min-width: 1000px)')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null) 
  const [contacts, setContacts] = useState(null) 

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')

    ky.get(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .json()
      .then((resp) => {
        setUser(resp)  
      })
      .catch((err) => {
        localStorage.removeItem('access_token')
        navigate('/login')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])
  if(loading) {
  return (  
    
    <Flex justifyContent='center' alignItems='center' bg={bgBody} h='100vh'>  
      <Spinner 
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Flex>
  )
  }

  if (!user) {
    return null
  }

  if (!loading) { 
    return (
      <UserContext.Provider value={user}>
      <Flex h='100vh' p='4' bg={bgBody} >
        <ListContacts fullView ={fullView} contactClick={contactClick} />
        {fullView ? <Textmessages contact={contacts} fullView={fullView}/> : ''}        
      </Flex>
      </UserContext.Provider>
    )
  }

  function handleLogout() {
    localStorage.removeItem('access_token')

    navigate('/login')
  } 
  
  function contactClick(contact){
    setContacts(contact) 
  }
}