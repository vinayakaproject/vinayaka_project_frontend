import React, { useEffect, useState } from 'react'
import { Formik  } from 'formik';
import { Flex, Button, useToast } from '@chakra-ui/react'
import InputError from '../../components/InputError'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import supabaseClient from '../../utils/supabaseClient';
import { useGlobalContext } from '../../utils/context';

const SigninSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password Too Short!').required('Password is required'),
});

const Login = () => {
    const toast = useToast()
    const { user, setUser } = useGlobalContext();
    
    const navigation = useNavigate();
    const [btnLoading, setbtnLoading] = useState(false)

    useEffect(() => { 
        if(user) {
            navigation('/');
        }
    }, [])

    const signIn = async (values, { setSubmitting }) => { 
        console.log(values);
        setbtnLoading(true);
        const { email, password } = values;
            
        const { data: { user, session }, error } = await supabaseClient.auth.signInWithPassword({
            email, password, 
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
        if(user && session) {
            setUser(user);
            toast({
                title: 'Success',
                description: "Logged in successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigation('/');
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
                            Signin
                        </h1>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={SigninSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                signIn(values, { setSubmitting })
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
                                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    {errors.email && touched.email && <InputError text={errors.email} />
                                    }
                                    <div className='mt-5'>
                                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    {errors.password && touched.password && <InputError text={errors.password} />}
                                    <Button isLoading={btnLoading} onClick={handleSubmit} className="w-full mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Login
                                    </Button>
                                    <p className="text-sm mt-5 font-light text-gray-500 dark:text-gray-400">
                                        Don&apos;t have an account? &nbsp;
                                        <Link to={'/signup'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</Link>
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

export default Login