import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import ProductCard from '../../components/ProductCard'
import { useNavigate } from 'react-router-dom'
import Stats from '../../components/StatCard'
import Loading from '../../components/Loading'
import { userFun } from '../../utils/utilites';
import { Flex, Button, useToast } from '@chakra-ui/react'

const Home = () => {
  const toast = useToast()
  const navigate = useNavigate()
  
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    const fetchProduct = async () => {
      const products = await userFun('getLatestFiveProd', null, 'GET');
      
      if(products.status === 201) {
        setProducts(products.message)

      }else {
          toast({
              title: 'Error',
              description: products.message,
              status: 'error',
              duration: 9000,
              isClosable: true,
          })
          
      }
    }
    fetchProduct()
  }, [toast])
  
  window.onbeforeunload = function () {
    console.log("In onbeforeunload");
    localStorage.removeItem('allProducts')
  };

  return (
    <>
      <Hero />
      {/* <Categories/> */}
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">PRODUCTS</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Latest PRODUCTS</h1>
      </div>
      
      {
        products.length > 0 ? 
        <ProductCard products={products} /> 
        :
        <Loading />
      }
      {
        products.length > 0 && <Flex justifyContent={'center'} mt={-10} alignItems={'center'}>
          <Button colorScheme='blue' onClick={() => navigate("/products")}>View More</Button>
        </Flex>
      }
      <Stats/>
    </>
  )
}

export default Home