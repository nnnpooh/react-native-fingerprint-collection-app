import React, {FC} from 'react';
import useWifi from './wifi/useWifi';
import {Button, VStack, Text, HStack, Box, FlatList} from 'native-base';
import {useAppSelector, useAppDispatch} from 'src/store/hook';
import {
  incrementCurrentDataIndex,
  decrementCurrentDataIndex,
} from 'src/store/wifiSlice';
import useRecord from './utilities/useRecord';
import ScanningInfo from 'src/components/record/ui/ScanningInfo';
import DisplayDataInfo from './ui/DisplayDataInfo';
const RecordWifiSection: FC = () => {
  const {handleReadWifi} = useWifi();
  const {data, isScanning, currentDataIndex} = useAppSelector(
    state => state.wifi,
  );
  const {currentPoint} = useAppSelector(state => state.location);
  const dispatch = useAppDispatch();
  const {mutate, pressRead, handlePressRead} = useRecord();
  const disableAddButton = isScanning || !pressRead;

  return (
    <VStack space={4}>
      <HStack space={2}>
        <Button
          onPress={() => {
            handlePressRead();
            handleReadWifi();
          }}
          flexGrow={3}
          isLoading={isScanning}
          isLoadingText="Scanning">
          Read
        </Button>
        <Button
          onPress={() => mutate()}
          flexGrow={1}
          colorScheme="secondary"
          isDisabled={disableAddButton}>
          Add
        </Button>
      </HStack>

      <HStack alignItems={'center'} justifyContent="space-between">
        <ScanningInfo />
        <DisplayDataInfo />
      </HStack>

      <FlatList
        data={data[currentDataIndex]}
        _contentContainerStyle={{paddingBottom: 600}}
        renderItem={data => (
          <HStack
            borderWidth={1}
            p={2}
            borderRadius="lg"
            borderColor={'gray.300'}
            alignItems="center"
            space={2}>
            <Box bg="gray.400" px={2} borderRadius="full">
              <Text color="white">{data.index + 1}</Text>
            </Box>
            <Text>
              {data.item.SSID} : {data.item.level}
            </Text>
          </HStack>
        )}
      />
    </VStack>
  );
};

export default RecordWifiSection;
