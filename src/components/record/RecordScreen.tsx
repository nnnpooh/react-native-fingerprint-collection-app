import React, {FC} from 'react';
import {Center, VStack, Text} from 'native-base';
import {useAppSelector} from 'src/store/hook';
import useRecord from './utilities/useRecord';
import RecordAlert from 'src/components/record/ui/RecordAlert';
import SelectLocationSection from 'src/components/record/SelectLocationSection';
import RecordWifiSection from 'src/components/record/RecordWifiSection';

const RecordScreen: FC = () => {
  const {showSucessAlert} = useRecord();
  const {currentSite, currentPoint} = useAppSelector(state => state.location);

  // console.log({data, totalScan, currentScanNumber, isScanning, scanInterval});
  console.log({showSucessAlert});
  return (
    <VStack space={4} m={6}>
      <SelectLocationSection />

      <RecordAlert
        text="Successfully write data to the database."
        open={showSucessAlert}
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
