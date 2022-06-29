import React, {useState} from 'react';
import {useMutation} from 'react-query';
import {useAppSelector, useAppDispatch} from 'src/store/hook';
import {db} from 'src/utilities/firebase/firebase';
import {SiteType, PointType} from 'src/components/location/types/location';
import {setReadFingerprint} from 'src/store/workingSlice';

function useRecord() {
  const [showSucessAlert, setShowSuccessAlert] = useState(false);
  const {
    data: wifiData,
    scanInterval,
    totalScan,
    currentScanNumber,
  } = useAppSelector(state => state.wifi);

  const {readFingerprint: pressRead} = useAppSelector(state => state.working);
  const dispatch = useAppDispatch();

  const {currentSite, currentPoint} = useAppSelector(state => state.location);

  console.log('hook', showSucessAlert);
  function handlePressRead() {
    dispatch(setReadFingerprint(true));
    setShowSuccessAlert(true);
  }

  async function writeData() {
    dispatch(setReadFingerprint(false));
    const now = new Date();
    const docId = getDocumentName(currentSite, currentPoint, now);
    const dbPath = `${currentSite.key}/${currentPoint.key}/readings/${docId}`;

    const wifiDataObject: any = {};
    wifiData.forEach((data, index) => {
      wifiDataObject[index.toString()] = data;
    });

    const dataAdded = {
      wifiData: wifiDataObject,
      wifiSettings: {
        scanInterval,
        totalScan,
      },
      site: currentSite,
      point: currentPoint,
      dbPath,
      docId,
      time: now,
      timestamp: now.getTime(),
    };

    // console.log({dataAdded});
    try {
      await db.doc(dbPath).set(dataAdded);
      return dataAdded;
    } catch (err) {
      console.log(err);
      throw new Error('Error writing data.');
    }
  }

  const {mutate} = useMutation(() => writeData(), {
    onSuccess: data => {
      setShowSuccessAlert(true);
      console.log('here');
    },
    onError: () => {},
  });

  return {mutate, pressRead, handlePressRead, showSucessAlert};
}

export default useRecord;

function getDocumentName(
  currentSite: SiteType,
  currentPoint: PointType,
  now: Date,
) {
  const time = now.toTimeString().slice(0, 8).replace(/:/g, '-');
  const date = now.toLocaleDateString().replace(/\//g, '-');
  //   return `${currentSite.key}_${currentPoint.key}_${date}_${time}`;
  return `${currentPoint.key}_${date}_${time}`;
}
