import React, {FC} from 'react';
import {VStack, Text, HStack, Box} from 'native-base';
import {useAppDispatch, useAppSelector} from 'src/store/hook';
import {setCurrentSite, setCurrentPoint} from 'src/store/locationSlice';
import SelectLocation from './ui/SelectLocation';

const SelectLocationSection: FC = () => {
  const {sites, currentSite, points, currentPoint} = useAppSelector(
    state => state.location,
  );
  const siteOptions = sites.map(site => ({label: site.text, value: site.key}));
  const pointOptions = points.map(site => ({
    label: site.text,
    value: site.key,
  }));

  const dispatch = useAppDispatch();

  return (
    <VStack space={4} p={4} bg="gray.200" borderRadius={'lg'}>
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

      <HStack alignItems={'center'} space={2} justifyContent={'flex-end'}>
        <Box bg="gray.400" px={3} borderRadius="md">
          <Text color="white">{`Scans: ${currentPoint.totalScans}`}</Text>
        </Box>
        <Box bg="gray.400" px={3} borderRadius="md">
          <Text color="white">
            {`Fingerprints: ${currentPoint.totalFingerprints}`}
          </Text>
        </Box>
      </HStack>
    </VStack>
  );
};

export default SelectLocationSection;
