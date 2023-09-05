import React, { useEffect, useState } from 'react'
import { Formik  } from 'formik';
import { Flex, Button, useToast } from '@chakra-ui/react'
import InputError from '../../components/InputError'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'
import supabaseClient from '../../utils/supabaseClient';
import { useGlobalContext } from '../../utils/context';
import { userFun } from '../../utils/utilites';
import useAnalyticsEventTracker from '../../useAnalyticsEventTracker';

const SignupSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password Too Short!').required('Password is required'),
});

const Signup = () => {
  const toast = useToast()
  const navigation = useNavigate();
  const [btnLoading, setbtnLoading] = useState(false)

  const { user } = useGlobalContext();
  const gaEventTracker = useAnalyticsEventTracker('Sign up');

  useEffect(() => { 
      if(user) {
          navigation('/');
      }
  }, [])

  const signUp = async (values, { setSubmitting }) => { 
        console.log(values);
        setbtnLoading(true);
        const { email, password, name } = values;
        
        const user = await userFun('getUser', { email: email });
        console.log(user)
        if(user.status === 201) { 

            const { data, error } = await supabaseClient.auth.signUp({
                email, password, 
                options: { data: { name } }
            });
    
            if (error) { 
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
            console.log(data);
            if(data.user) {
                console.log(data);
                const createdUser = await userFun('createUser', { userid: data.user.id, email, name });
            
                if(createdUser.status === 201) {
                    
                    toast({
                        title: 'Success',
                        description: createdUser.message,
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    navigation('/login');
                    gaEventTracker('signed-up');
                }else {
                    toast({
                        title: 'Error',
                        description: createdUser.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                    
                }
            }
            
        } else {
            toast({
                title: 'Error',
                description: user.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })

        }
        setbtnLoading(false);
        setSubmitting(false);
  }

  return (
    <Flex flex={1} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'}>
      
        <div className="flex flex-col px-6 py-8 mt-10 mb-10 lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={SignupSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            signUp(values, { setSubmitting })
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required="" onChange={handleChange} onBlur={handleBlur} />
                                </div>
                                {errors.name && touched.name && <InputError text={errors.name} />
                                }
                                <div className='mt-5'>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleChange} onBlur={handleBlur} />
                                </div>
                                {errors.email && touched.email && <InputError text={errors.email} />
                                }
                                <div className='mt-5'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} onBlur={handleBlur} />
                                </div>
                                {errors.password && touched.password && <InputError text={errors.password} />}
                                <Button isLoading={btnLoading} onClick={handleSubmit} className="w-full mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Signup
                                </Button>
                                <p className="text-sm mt-5 font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? &nbsp;
                                    <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signin here</Link>
                                </p>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
        
    </Flex>
  )
}

export default Signup