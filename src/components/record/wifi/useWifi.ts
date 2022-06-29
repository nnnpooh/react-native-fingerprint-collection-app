import React, {useEffect, useRef} from 'react';
import WifiManager from 'react-native-wifi-reborn';
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
  resetCurrentDataIndex,
  setIsPausing,
} from 'src/store/wifiSlice';

export default function useWifi() {
  const {
    scanInterval,
    totalScan,
    currentScanNumber,
    setIntervalID,
    isScanning,
    isPausing,
  } = useAppSelector(state => state.wifi);
  const dispatch = useAppDispatch();

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

  // function handleReadWifi() {
  //   dispatch(resetData());
  //   dispatch(resetCurrentDataIndex());
  //   dispatch(setIsScanning(true));
  //   dispatch(setIsPausing(false));
  // }

  // useEffect(() => {
  //   if (!isScanning) return;
  //   if (isPausing) return;
  //   if (currentScanNumber <= totalScan) {
  //     getWifiData(currentScanNumber);
  //     console.log('Execute scan at', currentScanNumber);
  //     setTimeout(() => {
  //       console.log('start countdown');
  //       dispatch(setIsPausing(false));
  //     }, scanInterval);
  //   } else {
  //     dispatch(setIsScanning(false));
  //     dispatch(resetCurrentScanNumber());
  //   }
  // }, [isPausing, currentScanNumber, isScanning]);

  function getWifiData() {
    if (WifiManager) {
      WifiManager.reScanAndLoadWifiList().then(lists => {
        const listsSorted = lists.sort((a, b) => (a.level > b.level ? -1 : 1));
        dispatch(appendData(listsSorted));
        // console.log('Finish scan at', currentScanNumber);
        // dispatch(setIsPausing(true));
      });
    } else {
      console.log('null wifimanager');
    }
  }

  return {handleReadWifi};
}
