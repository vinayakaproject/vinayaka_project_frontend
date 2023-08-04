import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'
import { userFun } from '../../utils/utilites';
import Loading from '../../components/Loading'

const Stats = () => {
  const toast = useToast();
  const [totalProd, settotalProd] = useState();
  const [totalOrders, settotalOrders] = useState();
  const [loading, setLoading] = useState(false);

  const getDetails = async () => {
    setLoading(true);
    const totalProdRes = await userFun('getTotalProducts', null, 'GET');
    const totalOrderRes = await userFun('getTotalOrders', null, 'GET');

    if (totalProdRes.status === 201 && totalOrderRes.status === 201) {
      settotalProd(totalProdRes.message);
      settotalOrders(totalOrderRes.message);
    }else {
      toast({
          title: 'Error',
          description: "There was an error. Please try again after sometime",
          status: 'error',
          duration: 9000,
          isClosable: true,
      })
    }
    setLoading(false);
  }

  useEffect(() => {
    getDetails();
  }, [])

  if(loading === true) return <></>;
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">A Fragrant Delight with Raving User Reviews</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Join the growing community of satisfied users and discover the magic of Vinayaka Agarbatti for yourself. Embrace the delightful essence and transform any moment into a truly unforgettable experience.</p>
        </div>
        <div className="flex flex-wrap -m-4 text-center justify-center items-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">{totalOrders}</h2>
              <p className="leading-relaxed">Orders</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">{totalProd}</h2>
              <p className="leading-relaxed">Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats