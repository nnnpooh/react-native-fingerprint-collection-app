import React, {useEffect, useRef} from 'react';
import WifiManager from 'react-native-wifi-reborn';
import {resetCurrentDataIndex} from 'src/store/wifiSlice';
import {useAppDispatch} from 'src/store/hook';
import {useAppSelector} from 'src/store/hook';
import {
  appendData,
  setIsScanning,
  resetData,
  incrementCurrentScanNumber,
  resetCurrentScanNumber,
  setSetIntervalID,
  resetSetIntervalID,
} from 'src/store/wifiSlice';

export default function useWifi() {
  const {scanInterval, totalScan, currentScanNumber, setIntervalID} =
    useAppSelector(state => state.wifi);
  const dispatch = useAppDispatch();
  // const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleReadWifi() {
    dispatch(resetData());
    dispatch(resetCurrentDataIndex());
    dispatch(setIsScanning(true));
    const setIntervalID = setInterval(() => {
      getWifiData();
      dispatch(incrementCurrentScanNumber());
    }, scanInterval);
    dispatch(setSetIntervalID(setIntervalID));
  }

  useEffect(() => {
    console.log({currentScanNumber, totalScan, setIntervalID});
    if (currentScanNumber > totalScan && setIntervalID) {
      clearInterval(setIntervalID);
      dispatch(resetSetIntervalID());
      dispatch(resetCurrentScanNumber());
      dispatch(setIsScanning(false));
    }
  }, [currentScanNumber]);

  function getWifiData() {
    if (WifiManager) {
      WifiManager.loadWifiList().then(lists => {
        const listsSorted = lists.sort((a, b) => (a.level > b.level ? -1 : 1));
        dispatch(appendData(listsSorted));
      });
    } else {
      console.log('null wifimanager');
    }
  }

  return {handleReadWifi};
}
