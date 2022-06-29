import React, {FC, useState} from 'react';
import useWiFi from './wifi/useWifi';
import {Center, Button, VStack, Text, HStack, Box, FlatList} from 'native-base';
import {useAppDispatch, useAppSelector} from 'src/store/hook';
import {setCurrentSite, setCurrentPoint} from 'src/store/locationSlice';
import {
  incrementCurrentDataIndex,
  decrementCurrentDataIndex,
} from 'src/store/wifiSlice';
import SelectLocation from './ui/SelectLocation';
import useRecord from './utilities/useRecord';
import RecordAlert from 'src/components/record/ui/RecordAlert';

const RecordScreen: FC = () => {
  const {sites, currentSite, points, currentPoint} = useAppSelector(
    state => state.location,
  );
  const siteOptions = sites.map(site => ({label: site.text, value: site.key}));
  const pointOptions = points.map(site => ({
    label: site.text,
    value: site.key,
  }));

  const {handleReadWifi} = useWiFi();
  const {
    data,
    isScanning,
    scanInterval,
    totalScan,
    currentScanNumber,
    currentDataIndex,
  } = useAppSelector(state => state.wifi);
  const dispatch = useAppDispatch();

  const {mutate, pressRead, handlePressRead, showSucessAlert} = useRecord();

  // console.log({data, totalScan, currentScanNumber, isScanning, scanInterval});

  const disableAddButton = isScanning || !pressRead;

  const selectSection = (
    <VStack space={4}>
      <HStack alignItems={'center'} space={8}>
        <Box>
          <Text bold>Site</Text>
        </Box>
        <SelectLocation
          currentLocation={currentSite}
          onValueChange={(value: string) => dispatch(setCurrentSite(value))}
          options={siteOptions}
          placeholder="Choose Site"
        />
      </HStack>
      <HStack alignItems={'center'} space={8}>
        <Box>
          <Text bold>Point</Text>
        </Box>
        <SelectLocation
          currentLocation={currentPoint}
          onValueChange={(value: string) => dispatch(setCurrentPoint(value))}
          options={pointOptions}
          placeholder="Choose Point"
        />
      </HStack>
    </VStack>
  );

  const recordSection = (
    <VStack space={4}>
      <HStack space={2}>
        <Button
          onPress={() => {
            handleReadWifi();
            handlePressRead();
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
        <Text>
          Scanning {currentScanNumber} / {totalScan} ({scanInterval} ms)
        </Text>

        <HStack alignItems={'center'} space={2}>
          <Text>
            Displaying {currentDataIndex + 1} / {data.length}
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
        </HStack>
      </HStack>

      <FlatList
        data={data[currentDataIndex]}
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

  return (
    <VStack space={4} m={6}>
      {selectSection}

      <RecordAlert
        text="Successfully write data to the database."
        open={showSucessAlert}
      />
      {currentSite.key && currentPoint.key ? (
        recordSection
      ) : (
        <Center>
          <Text>Please select a site and a point...</Text>
        </Center>
      )}
    </VStack>
  );
};

export default RecordScreen;
