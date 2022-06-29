import React, {FC} from 'react';
import {Text, Stack, HStack, Heading} from 'native-base';
import {useAppSelector} from 'src/store/hook';
import SettingModal from 'src/components/settings/SettingModal';

const SettingsScreen: FC = () => {
  const wifi = useAppSelector(state => state.wifi);

  return (
    <>
      <Stack alignItems="center" space={4} mt={4}>
        <Heading>WiFi</Heading>
        <HStack space={3}>
          <Text bold>Total Scan</Text>
          <Text>{wifi.totalScan}</Text>
        </HStack>
        <HStack space={3}>
          <Text bold>Scan Interval</Text>
          <Text>{wifi.scanInterval}</Text>
        </HStack>
      </Stack>
      <SettingModal />
    </>
  );
};

export default SettingsScreen;
