import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

function Loading() {
  return (
    <Flex mt={10} mb={10} justifyContent={'center'} alignItems={'center'}>
        <Spinner size='lg' />
    </Flex>
  )
}

export default Loading