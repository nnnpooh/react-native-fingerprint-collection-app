import React, {useState} from 'react';
import {useMutation} from 'react-query';
import {useAppSelector} from 'src/store/hook';
import {db} from 'src/utilities/firebase/firebase';
import {SiteType, PointType} from 'src/components/location/types/location';

function useRecord() {
  const {
    data: wifiData,
    scanInterval,
    totalScan,
    currentScanNumber,
  } = useAppSelector(state => state.wifi);

  const [pressRead, setPressRead] = useState(false);
  const [showSucessAlert, setShowSuccessAlert] = useState(false);
  const {currentSite, currentPoint} = useAppSelector(state => state.location);

  function handlePressRead() {
    setPressRead(true);
    setShowSuccessAlert(false);
  }

  async function writeData() {
    setPressRead(false);
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
        currentScanNumber,
      },
      site: currentSite,
      point: currentPoint,
      dbPath,
      docId,
      time: now,
      timestamp: now.getTime(),
    };

    console.log({dataAdded});
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
