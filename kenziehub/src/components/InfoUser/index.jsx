import { Flex, Text, Box } from '@chakra-ui/react';
const InfoUser = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="15vh"
      width="100%"
      borderTop="1px solid #212529"
      borderBottom="1px solid #212529"
    >
      <Box width="100%" display="flex" flexDir="row" justifyContent="center">
        <Text fontWeight="bold" color="white" marginRight="40%">
          Olá, {JSON.parse(localStorage.getItem('@kenzieHub :user'))}
        </Text>
        <Text fontSize="12px" color="gray">
          {JSON.parse(localStorage.getItem('@kenzieHub :module'))}
        </Text>
      </Box>
    </Flex>
  );
};
export default InfoUser;
