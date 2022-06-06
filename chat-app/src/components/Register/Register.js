import React from 'react' ;  
import {Flex,Box,Text,Input,Button,FormControl,FormHelperText,FormLabel,useColorModeValue} from '@chakra-ui/react';  
import {ErrorMessage, FastField, Form, Formik, FormikBag} from 'formik';
import ky from 'ky';
import {useNavigate} from 'react-router-dom'; 
import {buildFormikErrors} from '../../utils/build-formik-errors.js';
import { ColorModeSwitcher } from '../../ColorModeSwitcher'; 
import {useEffect,} from 'react';

export default function Register() {

 
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
        <Flex justifyContent='center' alignItems='center' h='9   0vh' bg={bgBody} color={colorText}>
          <Box w='50vw' border='1px solid gray' px='4'  pb='21' borderRadius='10' bg={bgContainer2}>
            <Formik
            initialValues={{ 
              email:'',
              password:'',
              name:'',
            }}

            validate={(valores)=>{
              let errores ={};
              if(!valores.name){ 
              errores.name='Name is required. ';
              }
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
                <Text fontSize='30px' my='4' align='center'>Register</Text>
                <FormControl h='20'my='6'>
                  <FormLabel>Name</FormLabel>
                  <FastField name="name"> 
                  {({field,meta})=>(<Input type='text'  {...field} autoComplete='off'/>)}
                  </FastField>  
                  <ErrorMessage name='name' component={() => (<Text color='red.700'>{errors.name} </Text> )}/>
                </FormControl>
                <FormControl h='20'my='6'>
                  <FormLabel>Email address</FormLabel>
                  <FastField name="email"> 
                  {({field,meta})=>(<Input   type='email' {...field} autoComplete='off' />)}
                  </FastField>  
                  {touched.email && errors.email ? <Text color='red.700'>{errors.email} </Text> : <FormHelperText> We'll never share your email</FormHelperText>}
                </FormControl>
                <FormControl h='20'my='6'>
                  <FormLabel>Password</FormLabel>
                  <FastField name="password"> 
                  {({field,meta})=>(<Input type='password'  {...field} autoComplete='off'/>)}
                  </FastField>   
                  {touched.password && errors.password ? 
                    <Text color='red.700'>{errors.password} </Text> :''
                  }
                  {touched.password && errors.password ==null? 
                    <Text color='green.400'>Valid password </Text> :''
                  }
              
                </FormControl>
                
                <Button isFullWidth colorScheme='blue' type='submit'  size='lg' mt='5' >Register</Button>
              </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </>
        )
  
  async function handleSubmit(values, formikBag) {
    const resp = await ky
      .post(`${process.env.REACT_APP_API_URL}/register`, {
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
