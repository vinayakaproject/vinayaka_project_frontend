import React from 'react'
import { Flex } from '@chakra-ui/react'

const InputError = ({ text }) => {

  return (
    <Flex mt={2}>
        <p className="block mb-2 text-sm text-red-700 dark:text-white">{text}</p>  
    </Flex>
  )
}

export default InputError