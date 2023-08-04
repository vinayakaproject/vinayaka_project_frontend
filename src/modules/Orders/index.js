import React, { useEffect, useState, useRef } from 'react'
import { Formik  } from 'formik';
import {
    Badge,
    Button,
    Flex,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    Td,
    AlertDialog,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Image,
    useToast,
    Select
  } from "@chakra-ui/react";
import InputError from '../../components/InputError'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import supabaseClient from '../../utils/supabaseClient';
import { useGlobalContext } from '../../utils/context';
import { userFun } from '../../utils/utilites';
import Loading from '../../components/Loading';

var alertContent;

function SelectStatus(props, type) { 
    return <Select {...props}>
      {props.type === 'filter' && <option value='All'>All</option>}
      <option value='Shipping'>Shipping</option>
      <option value='Delivered'>Delivered</option>
      <option value='Cancelled'>Cancelled</option>
    </Select>
}

const Orders = () => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const { user, setUser } = useGlobalContext();

    const [orderMsg, setorderMsg] = useState("No Orders yet");

    const allOrders = localStorage.getItem('allOrders') ? JSON.parse(localStorage.getItem('allOrders')) : null;

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(allOrders);
    const [updateStatBtnLoad, setupdateStatBtnLoad] = useState(false);
    const [newStat, setnewStat] = useState("");
    const [filterStat, setfilterStat] = useState("");
    const [showMoreLoading, setshowMoreLoading] = useState(false);


    const navigation = useNavigate();

    useEffect(() => { 
        if(!user) {
            navigation('/');
        }
        onClose()
    }, [])
    
    useEffect(() => {
        console.log("In use effect")
        console.log(allOrders)
        const fetchOrders = async () => {
            console.log("In fetch")
            setLoading(true);
            const order = await userFun('getOrderbyUser', {
                userid: user.id
            }, 'POST');
            
            if(order.status === 201) {
                console.log(order);    
                localStorage.setItem('allOrders', JSON.stringify(order.message))
                setOrders(order.message)
            }else {
                toast({
                    title: 'Error',
                    description: order.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
            setLoading(false);
        }
        !allOrders && fetchOrders()
    }, [])

    useEffect(() => { 
        window.onbeforeunload = function () {
            console.log("In onbeforeunload");
            localStorage.removeItem('allOrders')
        };
    }, []);
    
    const viewProducts = (products, quantity) => {
        const modifiedProd = products.map((prod, index) => {
            const prodQuantity = quantity[index]
            const prodTotPrice = prod.price * prodQuantity
            return {
                image:  <Flex width={'10vw'} height={'10vh'}>
                    <Image src={prod.image} width={'full'} height={'full'} objectFit={'contain'} alt={prod.name} />
                </Flex>,
                name: prod.name,
                price: '₹'+ prod.price,
                totalQuan: prodQuantity,
                totalCost: '₹'+ prodTotPrice,
            }
        })
        console.log(modifiedProd)
        alertContent = {
            type: 'view',
            title: 'Products',
            size: '5xl',
            body: {
                headers: ['', 'Name', 'Price', 'Ordered Quantity', 'Total Product Cost'],
                data: modifiedProd
            },
        }
        onOpen()
    }
    
    const filterOrders =  async (e) => { 
        setLoading(true);
        console.log(allOrders)

        const value = e.target.value;
        setfilterStat(value);

        const query =  (value === 'All' || value ===  '') ? { 
            userId: user.id,
            status: { $ne: 'Cancelled' } 
        } : { 
            userId: user.id,
            status: value
        }

        const order = await userFun('getOrderbyFilter', {
            query,
            skip: 0
        }, 'POST');
        
        if(order.status === 201) {
            console.log(order);   
            localStorage.setItem('allOrders', JSON.stringify(order.message))
            setOrders(order.message)
        }else {
            toast({
                title: 'Error',
                description: order.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        setLoading(false);
    }

    const showMore = async () => { 
        setshowMoreLoading(true);

        const query = (filterStat === 'All' || filterStat ===  '') ? { 
            userId: user.id,
            status: { $ne: 'Cancelled' } 
        } : { 
            userId: user.id,
            status: filterStat
        }

        const order = await userFun('getOrderbyFilter', {
            query,
            skip: orders.length
        }, 'POST');
        
        if(order.status === 201) {
            console.log(order);  
            const msg = `No Orders that are under ${filterStat} status`;
            setorderMsg(msg);
            const newOrders = [...orders, ...order.message] 
            localStorage.setItem('allOrders', JSON.stringify(newOrders))
            setOrders(newOrders)
        }else {
            toast({
                title: 'Error',
                description: order.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        setshowMoreLoading(false);
        
    }

    const getBadgeColour = (status) => { 
        switch(status) {
            case 'Ordered':
                return 'gray.300'
            case 'Shipping':
                return 'blue.300'
            case 'Delivered':
                return 'green.300'
            case 'Cancelled':
                return 'red.300'
            default:
                return 'gray.300'
        }
    }

    if(loading === true && orders === null) return <Loading />

    return (
        <Flex sx={{
            '&::-webkit-scrollbar': {
                display: 'none'
            }
            }} flex={1} flexDirection={'column'} overflow={'scroll'} justifyContent={'center'} width={'100%'} height={'100%'}>
            
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
                size={alertContent && alertContent.size}
                px={10}
                overflow={'scroll'}
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>{alertContent && alertContent.title}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody sx={{
                        '&::-webkit-scrollbar': {
                            display: 'none'
                    },}} overflow={'scroll'}>
                        <Table>
                            <Thead>
                                <Tr>
                                    {alertContent && alertContent.body.headers.map((header, index) => (
                                        <Th key={index} color="gray.400">{header}</Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {alertContent && alertContent.body.data.map((row, index) => (
                                    <Tr key={index}>
                                        {
                                        Object.keys(row).map((key, index) => (
                                            <Td key={index} color="gray.400">{row[key]}</Td>
                                        ))
                                        }
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>  
            <div className="flex flex-col px-6 py-8 mt-10 mb-10 lg:py-0">
                <div className="w-full md:mt-0 xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Flex justifyContent={'space-between'} alignItems={'center'}>
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Orders
                            </h1>
                            <Flex width={['50%', '25%', '25%']} pl={[0, 10]}>
                                <SelectStatus onChange={filterOrders} variant="filled" placeholder='Filter by status' type="filter" />
                            </Flex>
                        </Flex>
                        <Table width={'100%'} variant="striped">
                            <Thead>
                                <Tr my=".8rem" pl="0px" color="gray.400" >
                                    <Th color="gray.400" >Date</Th>
                                    <Th color="gray.400" >Payment Mode</Th>
                                    <Th color="gray.400" >Total Cost</Th>
                                    <Th color="gray.400" >Status</Th>
                                    <Th color="gray.400" >Products</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orders.map((row) => {
                                    return (
                                        <Tr key={row._id}>
                                            <Td>
                                                {new Date(row.date).toDateString()}
                                            </Td>
                                            <Td>
                                                {row.paymentMode}
                                            </Td>
                                            <Td>
                                                ₹{row.totalCost}
                                            </Td>
                                            <Td>
                                                <Badge
                                                    bg={getBadgeColour(row.status)}
                                                    color={"white"}
                                                    fontSize="16px"
                                                    p="3px 10px"
                                                    borderRadius="8px"
                                                >
                                                    {row.status}
                                                </Badge>
                                            </Td>
                                            <Td>
                                                <Button onClick={() => viewProducts(row.productId, row.quantity)}>View</Button>
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                        {
                            orders.length > 0 && 
                            <Flex justifyContent={'center'} mt={10}>
                                <Button colorScheme='blue' color='#fff' onClick={showMore} isLoading={showMoreLoading}>Show More</Button>
                            </Flex>
                        }
                        {
                            orders.length === 0 && <Flex justifyContent={'center'}  textAlign={'center'} mt={10}>
                                <Text fontSize={'md'} color="gray.400" fontWeight={'semibold'}>{orderMsg}</Text>
                            </Flex>
                        }
                    </div>
                </div>
            </div>
            
        </Flex>
    )
}

export default Orders