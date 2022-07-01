import React, {FC} from 'react';
import LocationModal from 'src/components/location/LocationModal';
import {setCurrentSite} from 'src/store/locationSlice';
import {useAppDispatch, useAppSelector} from 'src/store/hook';
import {HStack, Box, VStack, Text, FlatList, Pressable} from 'native-base';
import useModal from './utilities/useModal';
import AddButton from 'src/components/location/ui/AddButton';
import EditButton from 'src/components/location/ui/EditButton';
const SiteTab: FC = () => {
  const {sites, currentSite} = useAppSelector(state => state.location);
  const dispatch = useAppDispatch();
  const {handlePress, modalType, showModal, setShowModal} = useModal();
  return (
    <>
      <VStack space={4} m={6}>
        <HStack space={4} alignItems="center" justifyContent={'flex-end'}>
          <Text>Add Site</Text>
          <AddButton onPress={() => handlePress('ADD_SITE')} />
        </HStack>
        <FlatList
          data={sites}
          renderItem={data => (
            <Pressable
              onPress={() => {
                dispatch(setCurrentSite(data.item.key));
              }}>
              <HStack
                borderWidth={1}
                p={2}
                borderRadius="lg"
                borderColor={'gray.300'}
                alignItems="center"
                bg={data.item.key === currentSite.key ? 'gray.200' : 'gray.100'}
                justifyContent="space-between">
                <HStack alignContent="center" space={4}>
                  <Box bg="gray.400" px={2} borderRadius="full">
                    <Text color="white">{data.index + 1}</Text>
                  </Box>
                  <Text>
                    {data.item.text} ({data.item.key})
                  </Text>
                </HStack>
                <EditButton
                  onPress={() => {
                    dispatch(setCurrentSite(data.item.key));
                    handlePress('EDIT_SITE');
                  }}
                />
              </HStack>
            </Pressable>
          )}
        />
      </VStack>

      <LocationModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
      />
    </>
  );
};

export default SiteTab;
