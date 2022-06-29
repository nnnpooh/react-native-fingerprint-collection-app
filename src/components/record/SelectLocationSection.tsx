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
};

export default SelectLocationSection;
