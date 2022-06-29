import React, {FC} from 'react';
import useWifi from 'src/components/record/wifi/useWifi';
import {Button, VStack, Text, HStack, Box, FlatList, Icon} from 'native-base';
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
      <HStack alignItems={'center'} space={2}>
        <IconAD name="checkcircle" size={20} color="#059669" />
        <Text>
          Scanned {totalScan} / {totalScan}
        </Text>
      </HStack>
    );

  const IconPause: FC = () => (
    <IconAD name="pausecircle" size={20} color="#e11d48" />
  );
  const IconPlay: FC = () => <IconAD name="play" size={20} color="#0369a1" />;

  return (
    <HStack alignItems={'center'} space={2}>
      {!isPausing ? <IconPlay /> : <IconPause />}
      <Text>
        {!isPausing
          ? `Scanning ${currentScanNumber} / ${totalScan}`
          : `Pausing (${scanInterval} ms)`}
      </Text>
    </HStack>
  );
};

export default ScanningInfo;
