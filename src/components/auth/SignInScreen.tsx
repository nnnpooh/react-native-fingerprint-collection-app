import React, {FC, useEffect} from 'react';
import {Button, Input, Stack, Text} from 'native-base';
import useSignInOut from './useSignInOut';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
    <>
      <Stack mt={8} mx={8} space={4} alignItems="center">
        <Controller
          name="email"
          control={control}
          render={({field}) => (
            <Input
              size="2xl"
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
              size="2xl"
              type="password"
              placeholder="Password"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
        <Text color="red.500">{formState.errors?.password?.message || ''}</Text>

        <Button size="lg" onPress={handleSubmit(onSubmit)}>
          Sign In
        </Button>
        <Text color="red.500">{errorFB?.userInfo?.message} </Text>
      </Stack>
    </>
  );
};

export default SignInScreen;
