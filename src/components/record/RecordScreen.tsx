import React, {FC} from 'react';
import {Center, VStack, Text} from 'native-base';
import {useAppSelector} from 'src/store/hook';
import RecordAlert from 'src/components/record/ui/RecordAlert';
import SelectLocationSection from 'src/components/record/SelectLocationSection';
import RecordWifiSection from 'src/components/record/RecordWifiSection';

const RecordScreen: FC = () => {
  const {showFingerprintAlert: showAlert} = useAppSelector(
    state => state.working,
  );
  const {currentSite, currentPoint} = useAppSelector(state => state.location);

  return (
    <VStack space={4} m={6}>
      <SelectLocationSection />

      <RecordAlert
        text="Successfully wrote data to the database."
        open={showAlert}
      />
      {currentSite.key && currentPoint.key ? (
        <RecordWifiSection />
      ) : (
        <Center>
          <Text>Please select a site and a point...</Text>
        </Center>
      )}
    </VStack>
  );
};

export default RecordScreen;
