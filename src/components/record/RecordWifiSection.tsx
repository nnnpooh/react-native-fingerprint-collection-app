import React, {FC} from 'react';
import useWifi from './wifi/useWifi';
import {Button, VStack, Text, HStack, Box, FlatList} from 'native-base';
import {useAppSelector, useAppDispatch} from 'src/store/hook';
import {
  incrementCurrentDataIndex,
  decrementCurrentDataIndex,
} from 'src/store/wifiSlice';
import useRecord from './utilities/useRecord';
import Icon from 'react-native-vector-icons/AntDesign';
import ScanningInfo from 'src/components/record/ui/ScanningInfo';

const RecordWifiSection: FC = () => {
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

        <VStack alignItems={'flex-end'} space={2}>
          <Text>
            Displaying{' '}
            {data.length === 0
              ? '(None)'
              : `${currentDataIndex + 1} / ${data.length}`}
          </Text>
          <Button.Group isAttached>
            <Button
              size="xs"
              bg="primary.500"
              onPress={() => {
                dispatch(decrementCurrentDataIndex());
              }}
              isDisabled={currentDataIndex <= 0}>
              {'<'}
            </Button>
            <Button
              size="xs"
              bg="primary.500"
              onPress={() => {
                dispatch(incrementCurrentDataIndex());
              }}
              isDisabled={currentDataIndex >= data.length - 1}>
              {'>'}
            </Button>
          </Button.Group>
        </VStack>
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
