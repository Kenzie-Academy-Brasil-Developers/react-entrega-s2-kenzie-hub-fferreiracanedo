import { Flex } from '@chakra-ui/react';
import Api from '../../services/Api';
import { useState } from 'react';
import { useEffect } from 'react';

import CardInfo from '../CardInfo';

const CardTech = () => {
  const [tech, setTech] = useState([]);

  useEffect(() => {
    Api.get(`/users/${JSON.parse(localStorage.getItem('@KenzieHub:user_id'))}`)
      .then(response => {
        setTech(response.data.techs);
      })
      .catch(error => {});
  }, []);
  return (
    <Flex justifyContent="center" alignContent="center" width="100%">
      <Flex
        width="95%"
        flexDir="column"
        marginTop="42px"
        backgroundColor="gray.3"
        maxW="780px"
        maxH="580px"
        marginBottom="20px"
        borderRadius="4px"
      >
        <Flex width="100%" flexDir="column" justifyContent="center">
          {tech.map((item, index) => {
            return (
              <CardInfo
                id={item.id}
                key={index}
                title={item.title}
                status={item.status}
              />
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardTech;
