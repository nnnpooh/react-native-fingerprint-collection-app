import React, {FC} from 'react';
import {Button, VStack, Text, HStack, Box, FlatList} from 'native-base';
import {useAppSelector, useAppDispatch} from 'src/store/hook';
import {
  incrementCurrentDataIndex,
  decrementCurrentDataIndex,
} from 'src/store/wifiSlice';

const DisplayDataInfo: FC = () => {
  const {data, currentDataIndex} = useAppSelector(state => state.wifi);
  const dispatch = useAppDispatch();

  return (
    <HStack alignItems={'center'} space={2}>
      <Text>
        {data.length === 0 ? <></> : `${currentDataIndex + 1} / ${data.length}`}
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
  );
};

export default DisplayDataInfo;
