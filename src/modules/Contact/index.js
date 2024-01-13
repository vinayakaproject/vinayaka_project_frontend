import React from 'react';
import {
  Box,
  Heading,
  Text,
  Link,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { FaPhone } from 'react-icons/fa';

const Contact = () => {
  const openDialer = () => {
    window.location.href = 'tel:+91 9902030993';
  };

  return (
    <Box
      bg="black"
      color="white"
      p={{ base: '5', md: '10' }}
      fontFamily="Arial, sans-serif"
    >
      <Heading fontSize={{ base: '2xl', md: '4xl' }} textAlign="center" mb="5">
        Contact Us
      </Heading>
      <VStack spacing="5" alignItems="center" mx="auto" maxW="700px">
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
          Vinayaka Sales & Perfumery
        </Text>
        <Text fontSize={{ base: 'lg', md: 'xl' }}>Traditional Indian Fragrances</Text>
        <Text>Opp. Moti Gumbaz</Text>
        <Text>Civil Hospital Road, Vijayapura</Text>
        <Link
          textDecoration="underline"
          cursor="pointer"
          onClick={openDialer}
          display="block"
        >
          Phone: +91 9902030993
        </Link>
      </VStack>
      <Box
        border="2px solid white"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        maxW="100%"
        height="450px"
        mt="5" // Add margin to separate the text and map sections
      >
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1544.0018388584267!2d75.69452510961466!3d16.82967679233528!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc6ff9e409f5f89%3A0x5738b8fe9858038d!2sVinayaka%20Sales%20And%20Perfumery%2C%20Agarbati%20Factory!5e0!3m2!1sen!2sin!4v1693062291615!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
    </Box>
  );
};

export default Contact;
