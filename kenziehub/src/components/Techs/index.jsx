import {
  Text,
  Flex,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Api from '../../services/Api';
import { toast } from 'react-toastify';

import { useDisclosure } from '@chakra-ui/react';

const Techs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formrequired = yup.object().shape({
    title: yup
      .string()
      .required('Nome Obrigatório')
      .matches(
        '[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$',
        'Apenas Letras permitidas'
      ),
    status: yup.string().required('Status Obrigatório'),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(formrequired),
  });

  const sendTech = ({ title, status }) => {
    const data = { title, status };
    Api.post('/users/techs', data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem('@KenzieHub :token')
        )}`,
      },
    })
      .then(_ => {
        toast.success('Cadastro de tecnologia efetuado com sucesso!');
        onClose();
        window.location.reload();
      })
      .catch(err =>
        toast.error('Erro ao cadastrar tecnologia, verifique os dados')
      );
  };

  return (
    <Flex width="100%" flexDir="row" justifyContent="space-between">
      <Box width="100%" display="flex" justifyContent="center">
        <Text
          marginRight="40%"
          marginTop="20px"
          fontWeight="500"
          fontSize="16px"
        >
          Tecnologias
        </Text>
        <Button
          width="32px"
          height="32px"
          bgColor="gray.3"
          marginTop="20px"
          marginRight="20px"
          onClick={onOpen}
        >
          +
        </Button>

        <Modal width="369px" height="342px" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width="95%" height="292px">
            <ModalHeader bgColor="gray.2" textAlign="center">
              Cadastrar Tecnologia
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              bgColor="gray.3"
              display="flex"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <form>
                <FormControl marginTop="12px">
                  <FormLabel fontSize="12px" htmlFor="name">
                    Nome
                  </FormLabel>
                  <Input
                    width="95%"
                    placeholder="Digite o nome da tecnologia"
                    {...register('title')}
                  />
                </FormControl>
                <FormControl marginTop="12px">
                  <FormLabel fontSize="12px" htmlFor="name">
                    Selecionar Status
                  </FormLabel>
                  <Select {...register('status')} width="95%">
                    <option>Iniciante</option>
                    <option>Intermediário</option>
                    <option>Avançado</option>
                  </Select>
                </FormControl>
              </form>
            </ModalBody>
            <ModalFooter
              bgColor="gray.3"
              display="flex"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                width="324px"
                height="48px"
                padding="0px 22px 0px 22px"
                border="1.2px solid colorPrimary.1"
                bgColor="colorPrimary.1"
                mr={3}
                onClick={handleSubmit(sendTech)}
              >
                Cadastrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};
export default Techs;
