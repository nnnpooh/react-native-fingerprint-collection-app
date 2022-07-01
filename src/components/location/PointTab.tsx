import React, {FC} from 'react';
import LocationModal from 'src/components/location/LocationModal';
import {setCurrentPoint} from 'src/store/locationSlice';
import {useAppDispatch, useAppSelector} from 'src/store/hook';
import {
  Center,
  HStack,
  Box,
  VStack,
  Text,
  FlatList,
  Pressable,
} from 'native-base';
import useModal from './utilities/useModal';
import AddButton from 'src/components/location/ui/AddButton';
import EditButton from './ui/EditButton';
const PointTab: FC = () => {
  const {points, currentSite, currentPoint} = useAppSelector(
    state => state.location,
  );
  const dispatch = useAppDispatch();
  const {handlePress, modalType, showModal, setShowModal} = useModal();

  if (!currentSite.key)
    return <Center flex={1}>Please select a site...</Center>;

  return (
    <>
      <VStack m={6} space={4}>
        <Box bg="primary.600" p={3} borderRadius="lg" alignItems={'center'}>
          <Text fontSize="sm" color="white">
            {currentSite.text} ({currentSite.key})
          </Text>
        </Box>

        <HStack space={4} alignItems="center" justifyContent="flex-end">
          <Text>Add Point</Text>
          <AddButton onPress={() => handlePress('ADD_POINT')} />
        </HStack>

        <FlatList
          _contentContainerStyle={{paddingBottom: 300}}
          data={points}
          renderItem={data => (
            <Pressable
              onPress={() => {
                dispatch(setCurrentPoint(data.item.key));
              }}>
              <HStack
                borderWidth={1}
                p={2}
                borderRadius="lg"
                borderColor={'gray.300'}
                alignItems="center"
                space={2}
                bg={
                  data.item.key === currentPoint.key ? 'gray.200' : 'gray.100'
                }
                justifyContent="space-between">
                <HStack alignItems="center" space={4}>
                  <Box bg="gray.400" px={2} borderRadius="full">
                    <Text color="white">{data.index + 1}</Text>
                  </Box>

                  <VStack>
                    <Text bold>{data.item.text}</Text>

                    <Text fontSize="xs" color="gray.400">
                      {data.item.key}
                    </Text>
                  </VStack>
                </HStack>

                <HStack alignItems={'center'} space={3}>
                  <Box bg="gray.400" px={3} py={1} borderRadius="sm">
                    <Text color="white">
                      {`${data.item.totalFingerprints} (${data.item.totalScans})`}
                    </Text>
                  </Box>
                  <EditButton
                    onPress={() => {
                      dispatch(setCurrentPoint(data.item.key));
                      handlePress('EDIT_POINT');
                    }}
                  />
                </HStack>
              </HStack>
            </Pressable>
          )}
        />
      </VStack>
      <LocationModal
        modalType={modalType}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default PointTab;
