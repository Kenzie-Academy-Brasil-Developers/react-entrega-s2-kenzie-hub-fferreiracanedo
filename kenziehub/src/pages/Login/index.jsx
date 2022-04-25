import {
  Flex,
  Button,
  Text,
  Image,
  Input,
  FormControl,
  FormLabel,
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
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const Login = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();

  const formrequired = yup.object().shape({
    email: yup.string().required('Email Obrigatório').email('Email Inválido'),
    password: yup
      .string()
      .required('Senha Obrigatória')
      .matches(
        '^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$',
        'A senha deve conter : 1 letra maiúscula, 1 letra minúscula e um caractere especial : @,#,!..'
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formrequired),
  });

  const subs = data => {
    Api.post('/sessions', data)
      .then(_ => {
        toast.success('Login Efetuado com sucesso!');
        localStorage.setItem('@KenzieHub:token', _.data.token);
        localStorage.setItem('@kenzieHub :user', _.data.user.name);
        localStorage.setItem('@kenzieHub :module', _.data.user.course_module);

        localStorage.setItem('@KenzieHub:user_id', _.data.user.id);
        setAuthenticated(true);

        history.push('/dashboard');
      })
      .catch(err => toast.error('Erro ao efetuar login'));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Flex flexDir="column">
      <Flex width="100%" justifyContent="space-between">
        <Box
          marginTop="77px"
          width="100%"
          display="flex"
          justifyContent="center"
        >
          <Image src={LogoHub}></Image>
        </Box>
      </Flex>
      <Flex justifyContent="center">
        <Flex
          width="100%"
          maxW="370px"
          maxH="107vh"
          bgColor="gray.3"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius="4px"
          padding=" 42px 22px"
          marginBottom="55.3px"
          marginTop="42px"
        >
          <Text fontSize="16px">Login</Text>
          <form onSubmit={handleSubmit(subs)}>
            <FormControl marginTop="19px" isInvalid={errors.email?.message}>
              <FormLabel fontSize="12px" color="white">
                Email
              </FormLabel>
              <Input
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
            <FormControl marginTop="19px" isInvalid={errors.password?.message}>
              <FormLabel fontSize="12px" color="white">
                Senha
              </FormLabel>
              <Input
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
            <Button
              color="white"
              bgColor="colorPrimary.1"
              width="100%"
              maxW="65.2vw"
              maxH="7.2vh"
              marginTop="20.21px"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Login;
