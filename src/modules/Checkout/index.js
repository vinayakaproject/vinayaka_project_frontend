import React, { useEffect, useState } from 'react'
import { Formik  } from 'formik';
import { Flex, useToast, Grid, Button } from '@chakra-ui/react'
import InputError from '../../components/InputError'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import supabaseClient from '../../utils/supabaseClient';
import states from '../../states';
import { useGlobalContext } from '../../utils/context';
import { userFun } from '../../utils/utilites';

const SignupSchema = Yup.object().shape({
	flat: Yup.string().required('Flat/House no is required'),
	area: Yup.string().required('Area/Street Details is required'),
	landmark: Yup.string().required('Landmark Details is required'),
	town: Yup.string().required('Town/City Details no is required'),
	state: Yup.string().required('Select the state'),
	pincode: Yup.string().required('Pincode is required'),
	phone: Yup.string().min(10, 'Phone number is invalid').max(10, 'Phone number is invalid').required('Phone number is required'),
	paymode: Yup.string().required('Select mode of payment'),
});

const Checkout = () => {
  const toast = useToast()
  const navigation = useNavigate();

  const { user } = useGlobalContext();

  const carts = JSON.parse(localStorage.getItem('cart')) || []

  console.log(carts)

  const [total, setTotal] = useState(0)
  const [btnLoading, setbtnLoading] = useState(false)

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    setTotal(total)
  }, [carts])

  useEffect(() => { 
    if(!user) {
        navigation('/login');
    }
  }, [user])

  const submitOrder = async (values, { setSubmitting }) => { 
      console.log(values);
      setbtnLoading(true);

      const { flat, area, landmark, town, state, pincode, phone, paymode } = values;
      const { id } = user;
      const address = `${flat}, ${area}, ${landmark}, ${town}, ${state}, ${pincode}`;
      const productId = carts.map((cart) => {
        return cart._id;
      });
      const quantity = carts.map((cart) => {
        return cart.quantity;
      });

      const order = await userFun('postOrder', { productId, address, phone, paymentMode: paymode, quantity, userId: id });

      if(order.status === 201) {
                
        localStorage.removeItem('cart');
        toast({
            title: 'Success',
            description: order.message + "\n You can track your order status here.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        navigation('/orders');
        window.location.reload();
      }else {
          toast({
              title: 'Error',
              description: order.message,
              status: 'error',
              duration: 9000,
              isClosable: true,
          })
          
      }
      setbtnLoading(false);
  }

  return (
    <>
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row lg:flex-row shadow-md ">
        <div className="w-4/4 md:w-3/4 lg:w-3/4 bg-white px-10 mt-5 mb-10">
            <div className="flex flex-col">
                <div className="bg-white md:mt-0 sm:max-w-full xl:p-0">
                    <div className="space-y-2 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Checkout
                        </h1>
                        <Formik
                            initialValues={{ flat: '', area: '', landmark: '', town: '', state: "", pincode: '', phone: '', paymode: '' }}
                            validationSchema={SignupSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                submitOrder(values, { setSubmitting })
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
                                    <Grid gap={3}templateColumns='repeat(2, 1fr)' width={'100%'}>
                                      <Flex flexDirection={'column'}>
                                          <label htmlFor="flat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Flat, House no, Building, Company, Apartment</label>
                                          <input type="text" name="flat" id="flat" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} onBlur={handleBlur} />
                                          {errors.flat && touched.flat && <InputError text={errors.flat} />
                                          }
                                      </Flex>
                                      <Flex flexDirection={'column'}>
                                          <label htmlFor="area" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Area, Street, Sector, Village</label>
                                          <input type="text" name="area" id="area" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} onBlur={handleBlur} />
                                          {errors.area && touched.area && <InputError text={errors.area} />
                                          }
                                      </Flex>
                                    </Grid>
                                    <Grid gap={3} mt={5} templateColumns='repeat(2, 1fr)' width={'100%'}>
                                      <Flex flexDirection={'column'}>
                                          <label htmlFor="landmark" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Landmark</label>
                                          <input type="text" name="landmark" id="landmark" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} onBlur={handleBlur} />
                                          {errors.landmark && touched.landmark && <InputError text={errors.landmark} />
                                          }
                                      </Flex>
                                      <Flex flexDirection={'column'}>
                                          <label htmlFor="town" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Town/City</label>
                                          <input type="text" name="town" id="town" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} onBlur={handleBlur} />
                                          {errors.town && touched.town && <InputError text={errors.town} />
                                          }
                                      </Flex>
                                    </Grid>
                                    <Grid gap={3} mt={5} templateColumns='repeat(2, 1fr)' width={'100%'}>
                                      <Flex flexDirection={'column'}>
                                          <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                                          <select name="state" id="state" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} onBlur={handleBlur} >
                                              <option value="">Select</option>
                                            {
                                              states.map((state) => (
                                                <option key={state.key} value={state.name}>{state.name}</option>
                                              ))
                                            }
                                          </select>
                                          {errors.state && touched.state && <InputError text={errors.state} />
                                          }
                                      </Flex>
                                      <Flex flexDirection={'column'}>
                                          <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode</label>
                                          <input type="text" name="pincode" id="pincode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} onBlur={handleBlur} />
                                          {errors.pincode && touched.pincode && <InputError text={errors.pincode} />
                                          }
                                      </Flex>
                                    </Grid>
                                    <div className='mt-5'>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone number</label>
                                        <input type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="" onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    {errors.phone && touched.phone && <InputError text={errors.phone} />
                                    }
                                    <div className='mt-5'>
                                        <label htmlFor="paymode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mode of Payment</label>
                                        <select name="paymode" id="paymode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} onBlur={handleBlur}  >
                                            <option value="">Select</option>
                                            <option value={"Cash on Delivery"}>Cash on Delivery</option>
                                            <option value={"Online"}>Online</option>
                                        </select>
                                    </div>
                                    {errors.paymode && touched.paymode && <InputError text={errors.paymode} />}
                                    <Button isLoading={btnLoading} onClick={handleSubmit} className="w-full mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Place Order
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>

        <div id="summary" className="bg-primary-100 w-4/4 md:w-1/4 lg:w-1/4 px-8 mb-18 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-5 mb-5">
            <span className="font-semibold text-sm uppercase">Items {carts?.length}</span>
            <span className="font-semibold text-sm">{total?.toFixed(2)}₹</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - ₹10.00</option>
            </select>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>₹{(total + 10).toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default Checkout