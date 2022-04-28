import { Flex, Image, Button } from '@chakra-ui/react';
import LogoKenzieHub from '../../assets/LogoHub.svg';
import { useHistory } from 'react-router-dom';

const Header = ({ setAuthenticated }) => {
  const history = useHistory();

  const btnExit = () => {
    localStorage.clear();
    setAuthenticated(false);
    return history.push('/login');
  };

  return (
    <Flex
      backgroundColor="#121214"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      maxW="288vw"
      height="10.8vh"
    >
      <Image marginLeft="20px" src={LogoKenzieHub}></Image>
      <Button
        width="100%"
        maxW="10.6vw"
        maxH="4.8vh"
        bgColor="gray.3"
        onClick={btnExit}
        marginRight="20px"
        colorScheme="gray.3"
      >
        Sair
      </Button>
    </Flex>
  );
};
export default Header;
