import {
  Flex,
  Button,
  Text,
  Image,
  Input,
  FormControl,
  FormLabel,
  Select,
  Box,
  FormErrorIcon,
  FormErrorMessage,
} from '@chakra-ui/react';
import LogoHub from '../../assets/LogoHub.svg';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Api from '../../services/Api';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Register = ({ authenticated }) => {
  const history = useHistory();

  const formrequired = yup.object().shape({
    name: yup
      .string()
      .required('Nome Obrigatório')
      .matches(
        '[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$',
        'Apenas Letras permitidas'
      )
      .max(15, 'Limite de caracteres excedido'),
    email: yup.string().required('Email Obrigatório').email('Email Inválido'),
    password: yup
      .string()
      .required('Senha Obrigatória')
      .matches(
        '^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$',
        'A senha deve conter : 1 letra maiúscula, 1 letra minúscula e um caractere especial : @,#,!..'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas não são iguais'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formrequired),
  });

  const subs = ({ email, password, name, course_module, bio, contact }) => {
    const data = {
      email,
      password,
      name,
      course_module,
      bio: 'mateus',
      contact: '123456789',
    };
    Api.post('/users', data)
      .then(_ => {
        toast.success('Cadastro realizado com sucesso!');
        return history.push('/login');
      })
      .catch(err => toast.error('Erro ao criar a conta'));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Flex marginTop="30px" justifyContent="center">
      <Flex flexDir="column" justifyContent="center">
        <Box display="flex" justifyContent="space-between">
          <Image marginLeft="12px" width="100px" src={LogoHub}></Image>
          <Button
            marginRight="12px"
            bgColor="gray.2"
            width="67.49px"
            height="32px"
            colorScheme="gray.2"
          >
            Sair
          </Button>
        </Box>

        <Flex
          width="95%"
          maxW="370px"
          maxH="1107vh"
          bgColor="gray.3"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius="4px"
          padding=" 42px 22px"
          marginBottom="55.3px"
          marginTop="50px"
          marginLeft="10px"
        >
          <Text marginTop="22px" fontSize="16px">
            Crie sua conta
          </Text>
          <Text textAlign="center" fontSize="12px" color="gray.2">
            Rápido e Grátis, vamos nessa!
            <form onSubmit={handleSubmit(subs)}>
              <FormControl marginTop="19px" isInvalid={errors.name?.message}>
                <FormLabel fontSize="12px" color="white">
                  Nome
                </FormLabel>
                <Input
                  width="95%"
                  color="white"
                  placeholder="Digite seu nome"
                  {...register('name')}
                  name="name"
                  id="name"
                  type="text"
                />
                <FormErrorMessage color={'red'}>
                  <FormErrorIcon />
                  {errors.name?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl marginTop="19px" isInvalid={errors.email?.message}>
                <FormLabel fontSize="12px" color="white">
                  Email
                </FormLabel>
                <Input
                  width="95%"
                  color="white"
                  placeholder="Digite seu Email"
                  {...register('email')}
                  name="email"
                  id="email"
                  type="text"
                />
                <FormErrorMessage color={'red'}>
                  <FormErrorIcon />
                  {errors.email?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                marginTop="19px"
                isInvalid={errors.password?.message}
              >
                <FormLabel fontSize="12px" color="white">
                  Senha
                </FormLabel>
                <Input
                  width="95%"
                  color="white"
                  placeholder="Digite sua Senha"
                  {...register('password')}
                  name="password"
                  id="password"
                  type="password"
                />

                <FormErrorMessage color={'red'}>
                  <FormErrorIcon />
                  {errors.password?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl marginTop="19px">
                <FormLabel fontSize="12px" color="white">
                  Confirme a Senha
                </FormLabel>
                <Input
                  width="95%"
                  color="white"
                  placeholder="Confirme sua Senha"
                  {...register('confirmPassword')}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                />

                <FormErrorMessage color={'red'}>
                  <FormErrorIcon />
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                marginTop="29px"
                isInvalid={errors.confirmPassword?.message}
              >
                <Select
                  width="95%"
                  marginLeft="5px"
                  placeholder="Escolha seu módulo"
                  {...register('course_module')}
                >
                  <option width="95%" value="Módulo 1 (FrontEnd - Básico)">
                    Módulo 1 (FrontEnd - Básico)
                  </option>
                  <option width="95%" value="Módulo 1 (FrontEnd - Avançado)">
                    Módulo 2 (FrontEnd - Avançado)
                  </option>
                </Select>
              </FormControl>
              <Button
                color="white"
                bgColor="colorPrimary.1"
                width="100%"
                maxW="65.2vw"
                maxH="7.2vh"
                marginTop="20.21px"
                type="submit"
              >
                Cadastrar
              </Button>
              <Button
                color="white"
                bgColor="gray"
                width="100%"
                maxW="65.2vw"
                maxH="7.2vh"
                marginTop="20.21px"
                onClick={() => history.push('/login')}
              >
                Login
              </Button>
            </form>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Register;
