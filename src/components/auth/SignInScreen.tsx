import React, {FC, useEffect} from 'react';
import {Button, Input, VStack, Text, HStack} from 'native-base';
import useSignInOut from './useSignInOut';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/AntDesign';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

interface FormDataType {
  email: string;
  password: string;
}

const SignInScreen: FC = () => {
  const {handleSignIn, error: errorFB} = useSignInOut();
  const {handleSubmit, watch, control, formState} = useForm<FormDataType>({
    resolver: yupResolver(schema),
    defaultValues: {email: '', password: ''},
  });

  function onSubmit(data: FormDataType) {
    handleSignIn(data.email, data.password);
  }

  console.log({value: watch(), errors: formState.errors});
  return (
    <VStack mx={8} mt={12} space={2} alignItems="center">
      <Controller
        name="email"
        control={control}
        render={({field}) => (
          <Input
            size="xl"
            placeholder="Email"
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      <Text color="red.500">{formState.errors?.email?.message || ''}</Text>

      <Controller
        name="password"
        control={control}
        render={({field}) => (
          <Input
            size="xl"
            type="password"
            placeholder="Password"
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      <Text color="red.500">{formState.errors?.password?.message || ''}</Text>

      <Button size="md" onPress={handleSubmit(onSubmit)} width={200}>
        <HStack alignItems={'center'} space={4}>
          <Text color="white">Log In</Text>
          <Icon name="login" size={20} color="white" />
        </HStack>
      </Button>
      <Text color="red.500">{errorFB?.userInfo?.message} </Text>
    </VStack>
  );
};

export default SignInScreen;
