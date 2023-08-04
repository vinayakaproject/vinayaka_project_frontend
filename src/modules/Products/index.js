import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories'
import ProductCard from '../../components/ProductCard'
import { userFun } from '../../utils/utilites';
import { Flex, Button, useToast } from '@chakra-ui/react'
import Loading from '../../components/Loading';

const Products = () => {
  const allProducts = localStorage.getItem('allProducts') ? JSON.parse(localStorage.getItem('allProducts')) : [];

  const toast = useToast()
  const [products, setProducts] = useState(allProducts)
  const [showMoreLoading, setshowMoreLoading] = useState(false);

  const fetchProducts = async () => {
    console.log("In fetch")
    console.log(products.length)
    const productsFetch = await userFun('getAllProducts', {
      skip: products.length
    }, 'POST');
    
    if(productsFetch.status === 201) {
      console.log(productsFetch);    
      const newProducts = [...products, ...productsFetch.message] 
      localStorage.setItem('allProducts', JSON.stringify(newProducts))
      setProducts(newProducts)
    }else {
        toast({
            title: 'Error',
            description: productsFetch.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
    }
  }

  useEffect(() => {
    console.log("In use effect")
    console.log(allProducts)
    allProducts.length === 0 && fetchProducts()
    window.onbeforeunload = function () {
      console.log("In onbeforeunload");
      localStorage.removeItem('allProducts')
    };
  }, [])

  const showMore = async () => { 
    setshowMoreLoading(true);
    fetchProducts().then(() => { 
      setshowMoreLoading(false);
    });
  }

  
  return (
    <div>
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">PRODUCTS</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">ALL PRODUCTS</h1>
      </div>
      {
        products.length > 0 ?
        <ProductCard products={products}/>
        :
        <Loading />
      }
      {
        products.length > 0 && <Flex justifyContent={'center'} mt={-15} mb={10}>
          <Button colorScheme='blue' color='#fff' onClick={showMore} isLoading={showMoreLoading}>Show More</Button>
        </Flex>
      }
    </div>
  )
}

export default Products