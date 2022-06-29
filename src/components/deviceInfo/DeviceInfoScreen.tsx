import React, {FC} from 'react';
import {useAppSelector} from 'src/store/hook';
import {Center, HStack, VStack, Text, Heading, Divider} from 'native-base';
const DeviceInfoScreen: FC = () => {
  const {deviceInfo, hasAccessFineLocation} = useAppSelector(
    state => state.working,
  );
  return (
    <Center mt={4}>
      <HStack space={3}>
        <Text bold>Model</Text>
        <Text>{deviceInfo.model}</Text>
      </HStack>
      <HStack space={3}>
        <Text bold>Device ID</Text>
        <Text>{deviceInfo.deviceId}</Text>
      </HStack>
      <HStack space={3}>
        <Text bold>Manufacturer</Text>
        <Text>{deviceInfo.manufacturer}</Text>
      </HStack>
      <HStack space={3}>
        <Text bold>Carrier</Text>
        <Text>{deviceInfo.carrier}</Text>
      </HStack>
      <HStack space={3}>
        <Text bold>Unique ID</Text>
        <Text>{deviceInfo.uniqueId}</Text>
      </HStack>
      <Divider my={3} />
      <HStack space={3}>
        <Text bold>ACCESS_FINE_LOCATION</Text>
        <Text>{hasAccessFineLocation ? 'Granted' : 'Not Granted'}</Text>
      </HStack>
    </Center>
  );
};

export default DeviceInfoScreen;
