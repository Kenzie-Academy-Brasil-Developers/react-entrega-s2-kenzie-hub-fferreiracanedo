import {
  Flex,
  Text,
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  FormLabel,
  Input,
  FormControl,
  Select,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import Api from '../../services/Api';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

const CardInfo = ({ index, title, status, icon, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formrequired = yup.object().shape({
    status: yup.string().required('Status Obrigatório'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formrequired),
  });

  const deleteTech = id => {
    Api.delete(`/users/techs/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@KenzieHub :token')}`,
      },
    })
      .then(res => {
        toast.success('tecnologia deletada com sucesso');
        setInterval(() => {
          onClose();
          window.location.reload();
        }, 1000);
      })
      .catch(err => {
        toast.error('erro ao deletar tecnologia');
      });
  };

  const updateTech = data => {
    console.log(data);
    Api.put(`/users/techs/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@KenzieHub :token')}`,
      },
    })
      .then(res => {
        toast.success('tecnologia atualizada com sucesso');
        setInterval(() => {
          onClose();

          window.location.reload();
        }, 1000);
      })

      .catch(err => {
        toast.error('erro ao atualizar tecnologia');
      });
  };

  return (
    <Flex width="100%" justifyContent="center">
      <Box
        width="100%"
        marginTop="20px"
        bgColor="gray.4"
        marginLeft="20px"
        marginRight="20px"
        maxW="742px"
        justifyContent="space-between"
        display="flex"
        padding="22px 19px"
        marginBottom="20px"
        borderRadius="4px"
      >
        <Text>{title}</Text>
        <Text>{status}</Text>
        <ViewIcon onClick={onOpen}></ViewIcon>

        <Modal width="100%" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="350px">
            <ModalHeader bgColor="gray.2" textAlign="center">
              Tecnologia Detalhes
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              bgColor="gray.3"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <form onSubmit={handleSubmit(updateTech)}>
                <FormControl>
                  <FormLabel>Nome do projeto</FormLabel>
                  <Input placeholder={title} />
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select {...register('status')}>
                    <option>Iniciante</option>
                    <option>Intermediário</option>
                    <option>Avançado</option>
                  </Select>
                </FormControl>
                <Box
                  display="flex"
                  flexDir="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    bgColor="colorPrimary.negative"
                    width="204px"
                    height="48px"
                    marginRight="22px"
                    type="submit"
                    marginTop="20px"
                  >
                    Salvar Alterações
                  </Button>
                  <Button
                    marginTop="20px"
                    onClick={() => deleteTech(id)}
                    bgColor="gray.1"
                    width="98px"
                    height="48px"
                  >
                    Excluir
                  </Button>
                </Box>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};
export default CardInfo;
