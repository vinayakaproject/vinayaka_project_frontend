import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const TermsAndConditions = () => {
  return (
    <Box p="4">
      <Heading as="h2" size="lg" mb="4">
        Terms and Conditions
      </Heading>
      <Text mb="4">
        By accessing and using this website, you accept and agree to be bound by
        the terms and provisions of this agreement. In addition, when using this
        website’s particular services, you shall be subject to any posted
        guidelines or rules applicable to such services, which may be posted and
        modified from time to time. All such guidelines or rules are hereby
        incorporated by reference into the Terms and Conditions.
      </Text>
      <Heading as="h3" size="md" mb="2">
        Disclaimer of Warranties
      </Heading>
      <Text mb="4">
        This website is provided “as is” without any representations or
        warranties, express or implied. The owner of this website makes no
        representations or warranties in relation to this website or the
        information and materials provided on this website.
      </Text>
      <Heading as="h3" size="md" mb="2">
        Limitations of Liability
      </Heading>
      <Text mb="4">
        In no event shall the owner of this website be liable for any damages
        whatsoever (including, without limitation, damages for loss of profits,
        business interruption, loss of information) arising out of the use of or
        inability to use the materials on this website, even if the owner of
        this website has been notified orally or in writing of the possibility
        of such damage.
      </Text>
      {/* Add more sections as needed */}
    </Box>
  );
};

export default TermsAndConditions;
