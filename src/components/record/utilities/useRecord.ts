import {useMutation} from 'react-query';
import {useAppSelector, useAppDispatch} from 'src/store/hook';
import {db, FieldValue} from 'src/utilities/firebase/firebase';
import {SiteType, PointType} from 'src/components/location/types/location';
import {
  setReadFingerprint,
  setShowFingerprintAlert,
} from 'src/store/workingSlice';

function useRecord() {
  const {
    data: wifiData,
    scanInterval,
    totalScan,
  } = useAppSelector(state => state.wifi);

  const {
    readFingerprint: pressRead,
    deviceInfo,
    email,
  } = useAppSelector(state => state.working);
  const dispatch = useAppDispatch();

  const {currentSite, currentPoint} = useAppSelector(state => state.location);

  function handlePressRead() {
    dispatch(setReadFingerprint(true));
    dispatch(setShowFingerprintAlert(false));
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
      deviceInfo,
      email,
    };

    try {
      await db.doc(dbPath).set(dataAdded);
      await db.doc(currentPoint.dbPath).update({
        totalScans: FieldValue.increment(1),
        totalFingerprints: FieldValue.increment(totalScan),
      });
      return dataAdded;
    } catch (err) {
      console.log(err);
      throw new Error('Error writing data.');
    }
  }

  const {mutate} = useMutation(() => writeData(), {
    onSuccess: data => {
      dispatch(setShowFingerprintAlert(true));
    },
    onError: () => {},
  });

  return {mutate, pressRead, handlePressRead};
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
