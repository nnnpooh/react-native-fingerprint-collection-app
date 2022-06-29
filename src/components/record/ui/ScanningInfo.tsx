import React, {FC} from 'react';
import useWifi from 'src/components/record/wifi/useWifi';
import {Button, VStack, Text, HStack, Box, FlatList} from 'native-base';
import {useAppSelector, useAppDispatch} from 'src/store/hook';
import useRecord from 'src/components/record/utilities/useRecord';
import IconAD from 'react-native-vector-icons/AntDesign';

const ScanningInfo: FC = () => {
  const {handleReadWifi} = useWifi();
  const {
    data,
    isScanning,
    scanInterval,
    totalScan,
    currentScanNumber,
    currentDataIndex,
    isPausing,
  } = useAppSelector(state => state.wifi);

  if (!isScanning)
    return (
      <Text>
        Scanned {currentScanNumber} / {totalScan}
      </Text>
    );

  const IconPause: FC = () => (
    <IconAD name="pausecircle" size={20} color="gray" />
  );

  const IconPlay: FC = () => <IconAD name="play" size={20} color="green" />;

  return (
    <VStack alignItems={'flex-start'} space={2}>
      {isPausing ? <IconPause /> : <IconPlay />}
      <Text>
        Scanning {currentScanNumber} / {totalScan} ({scanInterval} ms)
      </Text>
    </VStack>
  );
};

export default ScanningInfo;
