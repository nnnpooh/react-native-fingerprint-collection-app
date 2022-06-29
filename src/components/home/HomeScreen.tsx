import React, {FC} from 'react';
import {
  Box,
  VStack,
  Center,
  Text,
  Pressable,
  Button,
  HStack,
} from 'native-base';
import {HomeProps} from 'src/utilities/navigation/navigation';
import useSignInOut from '../auth/useSignInOut';
import {useAppSelector} from 'src/store/hook';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeMenuButton from 'src/components/home/ui/HomeMenuButton';
const HomeScreen: FC<HomeProps> = props => {
  const {handleSignOut} = useSignInOut();
  const {email} = useAppSelector(state => state.working);
  return (
    <VStack space={8} m={6}>
      <HStack alignItems={'center'} justifyContent="space-between" space={8}>
        <HStack
          alignItems={'center'}
          px={2}
          py={1}
          bg="primary.600"
          borderRadius={'lg'}
          space={2}>
          <Icon name="user" size={20} color="white" />
          <Text color="white">{email || 'no user'}</Text>
        </HStack>
        <Button onPress={handleSignOut} bg="primary.500">
          <Icon name="logout" size={20} color="white" />
        </Button>
      </HStack>

      <VStack space={4}>
        <HomeMenuButton
          onPress={() => props.navigation.navigate('Device Info')}
          label={'Device Information'}
          bg={'indigo.300'}
        />
        <HomeMenuButton
          onPress={() => props.navigation.navigate('Record')}
          label={'Record'}
          bg={'indigo.500'}
        />
        <HomeMenuButton
          onPress={() => props.navigation.navigate('Location')}
          label={'Location'}
          bg={'indigo.700'}
        />
        <HomeMenuButton
          onPress={() => props.navigation.navigate('Settings')}
          label={'Settings'}
          bg={'indigo.900'}
        />
      </VStack>
    </VStack>
  );
};

export default HomeScreen;
