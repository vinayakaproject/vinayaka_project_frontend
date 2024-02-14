import React from "react";
import { Box, Text, Link, List, ListItem } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box p="4">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Privacy Policy
      </Text>
      <Text mb="4">
        At Vinayaka, we prioritize the privacy and security of our customers'
        personal information. This Privacy Policy outlines how we collect, use,
        and protect the information you provide to us.
      </Text>

      <Text fontWeight="bold" mb="2">
        Information Collection:
      </Text>
      <List ml="4" mb="4">
        <ListItem>
         * We may collect personal information such as name, contact details, and
          email address when you interact with our website, make a purchase, or
          sign up for our newsletter.
        </ListItem>
        <ListItem>
           *We also collect non-personal information such as browser type,
          operating system, and IP address for analytical purposes.
        </ListItem>
      </List>

      <Text fontWeight="bold" mb="2">
        Use of Information:
      </Text>
      <Text mb="4">
        We use the information collected to process orders, communicate with
        customers, and improve our products and services. Personal information
        may be used for marketing purposes, such as sending promotional offers
        and newsletters, but you can opt-out at any time.
      </Text>

      <Text fontWeight="bold" mb="2">
        Information Sharing:
      </Text>
      <Text mb="4">
        We do not sell, trade, or rent your personal information to third
        parties. Your information may be shared with trusted service providers
        who assist us in operating our website and conducting business, but only
        to the extent necessary.
      </Text>

      <Text fontWeight="bold" mb="2">
        Data Security:
      </Text>
      <Text mb="4">
        We implement various security measures to protect your personal
        information from unauthorized access, disclosure, or alteration.
        However, no method of transmission over the internet or electronic
        storage is 100% secure, and we cannot guarantee absolute security.
      </Text>

      <Text fontWeight="bold" mb="2">
        Cookies:
      </Text>
      <Text mb="4">
        Our website may use cookies to enhance user experience and track usage
        patterns. You can choose to disable cookies in your browser settings,
        but this may affect certain functionalities of the website.
      </Text>

      <Text fontWeight="bold" mb="2">
        Third-Party Links:
      </Text>
      <Text mb="4">
        Our website may contain links to third-party websites for your
        convenience. We are not responsible for the privacy practices or content
        of these websites.
      </Text>

      <Text fontWeight="bold" mb="2">
        Children's Privacy:
      </Text>
      <Text mb="4">
        Our products and services are not directed at children under the age of
        13. We do not knowingly collect personal information from children.
      </Text>

      <Text fontWeight="bold" mb="2">
        Consent:
      </Text>
      <Text mb="4">
        By using our website and providing your personal information, you
        consent to the terms of this Privacy Policy.
      </Text>

      <Text fontWeight="bold" mb="2">
        Changes to Privacy Policy:
      </Text>
      <Text mb="4">
        We reserve the right to update or modify this Privacy Policy at any
        time. Any changes will be effective immediately upon posting on our
        website.
      </Text>

      <Text fontWeight="bold" mb="2">
        Contact Us:
      </Text>
      <Text mb="4">
        If you have any questions or concerns about our Privacy Policy, please
        contact us at{" "}
         <Link color="blue.500" href="tel:+91 9902030993">+91 9902030993</Link>.
      </Text>

      <Text>
        By using our website, you acknowledge that you have read and understood
        this Privacy Policy.
      </Text>
    </Box>
  );
};

export default PrivacyPolicy;
