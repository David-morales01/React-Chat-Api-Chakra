import React from 'react' ;  
import {Flex,Box,Text,Input,Button,FormControl,FormHelperText,FormLabel,useColorModeValue} from '@chakra-ui/react';  
import {ErrorMessage, FastField, Form, Formik, FormikBag} from 'formik';
import ky from 'ky';
import {useNavigate} from 'react-router-dom'; 
import {buildFormikErrors} from '../../utils/build-formik-errors.js';
import { ColorModeSwitcher } from '../../ColorModeSwitcher'; 
import {useEffect,} from 'react';


export default function Login() {

  const navigate = useNavigate()
  const bgBody = useColorModeValue('gray.50', 'blackAlfa.800') ;
  const bgContainer2 = useColorModeValue('white', 'blue.900') ;
  const colorText = useColorModeValue('black', 'white') ; 
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if(accessToken){
      
      navigate('/')

    }
  }, [navigate])
  return (
    <>
    <Flex h='10vh' w='100wh' justifyContent='flex-end'>
      <ColorModeSwitcher/>
    </Flex>  
    <Flex justifyContent='center' alignItems='center' h='90vh' background={bgBody} color={colorText}>
          
      <Box w='50vw' border='1px solid gray' px='4'my='20' pb='21' borderRadius='10' bg={bgContainer2}> 
        <Formik
        initialValues={{ 
          email:'',
          password:'', 
         }}

         validate={(valores)=>{
          let errores ={}; 
          if(!valores.email){ 
           errores.email='Email is required. ';
          }
          if(!valores.password){ 
           errores.password='Password is required. ';
          }else if(valores.password.length <=9){
            errores.password='The password must contain at least 10 characters. ';
          }
           return errores;
         }}

        onSubmit={handleSubmit}
        
        >
          {({errors,touched})=> (
          <Form>
            <Text fontSize='30px' my='4' align='center'>Login</Text> 
            <FormControl h='20' my='10'>
              <FormLabel>Email address</FormLabel>
              <FastField name="email"> 
              {({field,meta})=>(<Input   type='email' {...field} autoComplete='off' />)}
              </FastField>  
              {touched.email && errors.email ? <Text my='2' color='red.700'>{errors.email} </Text> : <FormHelperText color={colorText}> We'll never share your email</FormHelperText>}
            </FormControl>
            <FormControl h='20' my='10'>
              <FormLabel>Password</FormLabel>
              <FastField name="password"> 
              {({field,meta})=>(<Input type='password'  {...field} autoComplete='off'/>)}
              </FastField>   
              {touched.password && errors.password ? 
                <Text my='2' color='red.700'>{errors.password} </Text> :''
              }
              {touched.password && errors.password ==null? 
                <Text my='2' color='green.400'>Valid password </Text> :''
              }
              
            </FormControl>
            
            <Button isFullWidth colorScheme='blue' type='submit'  size='lg' mt='5' >Login</Button>
          </Form>
          )}
        </Formik>
      </Box>
    </Flex>
    </>
  )
  
  async function handleSubmit(values, formikBag) {
    const resp = await ky
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        json: values,
        throwHttpErrors: false,
      })
      .json()

    if (resp.errors) {
      let errors = buildFormikErrors(resp.errors)

      formikBag.setErrors(errors)

      return
    }

    localStorage.setItem('access_token', resp.access_token)

    navigate('/')
  }
}
