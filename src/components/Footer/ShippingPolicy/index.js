import React from 'react';
import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react';

const ShippingPolicy = () => {
  return (
    <Box p="4">
      <Heading as="h2" size="lg" mb="4">
        Shipping Policy
      </Heading>
      <UnorderedList mb="4">
        <ListItem>
          We offer shipping to most regions around India. Please note that shipping
          times may vary depending on your location.
        </ListItem>
        <ListItem>
          Orders are typically processed within 1-2 business days or based on address it will be maximum 15 business days. Once your
          order has been processed, you will receive a confirmation email with
          tracking information.
        </ListItem>
        <ListItem>
          Shipping costs will be calculated at checkout based on the weight and
          dimensions of your order, as well as your location.
        </ListItem>
        <ListItem>
          Please ensure that your shipping address is correct before placing
          your order. We are not responsible for orders shipped to incorrect
          addresses provided by the customer.
        </ListItem>
        <ListItem>
          If you have any questions or concerns about shipping, please don't
          hesitate to chat with us.
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default ShippingPolicy;
