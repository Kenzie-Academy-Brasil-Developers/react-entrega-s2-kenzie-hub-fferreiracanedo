import { Flex, Box } from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import CardTech from '../../components/CardTech';
import Header from '../../components/Header';
import InfoUser from '../../components/InfoUser';
import Techs from '../../components/Techs';

const Dashboard = ({ authenticated, setAuthenticated }) => {
  if (!authenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Flex flexDir="column">
      <Header setAuthenticated={setAuthenticated} />
      <Flex justifyContent="center" width="100%" flexDir="column">
        <InfoUser />
        <Techs />

        <CardTech />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
