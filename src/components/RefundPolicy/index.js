import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

const RefundPolicy = () => {
  return (
    <Box p="4">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Cancellation/Refund Policy
      </Text>
      <Text mb="4">
        At Vinayaka, we strive to provide the best possible service to our
        customers. If you are not satisfied with your purchase or need to cancel
        your order, please review our Cancellation/Refund Policy below.
      </Text>

      <Text fontWeight="bold" mb="2">
        Cancellation:
      </Text>
      <Text mb="4">
        You may cancel your order within 24 hours of placing it. To cancel your
        order, please contact our customer support team at{" "}
        <Link color="blue.500" href="tel:+91 9902030993">
          +91 9902030993
        </Link>
        . Please note that cancellations requested after 24 hours may not be
        possible if the order has already been processed or shipped.
      </Text>

      <Text fontWeight="bold" mb="2">
        Refund:
      </Text>
      <Text mb="4">
        If you are dissatisfied with your purchase for any reason, you may
        request a refund within 30 days of receiving your order. To request a
        refund, please contact our customer support team with your order details
        and reason for the refund request.
      </Text>

      <Text mb="4">
        Refunds will be processed within 7-10 business days after approval. Once
        your refund has been processed, you will receive a confirmation email.
        Please note that shipping charges are non-refundable, and you will be
        responsible for any return shipping costs.
      </Text>

      <Text>
        If you have any questions or concerns about our Cancellation/Refund
        Policy, please contact us at{" "}
        <Link color="blue.500" href="tel:+91 9902030993">
          +91 9902030993
        </Link>

      </Text>
    </Box>
  );
};

export default RefundPolicy;
