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
    // const setIntervalID = setInterval(() => {
    //   getWifiData();
    //   dispatch(incrementCurrentScanNumber());
    // }, scanInterval);
    // dispatch(setSetIntervalID(setIntervalID));
    scanWifi(1, totalScan);
  }

  useEffect(() => {
    // console.log({currentScanNumber, totalScan, setIntervalID});
    if (currentScanNumber > totalScan && setIntervalID) {
      // clearInterval(setIntervalID);
      // dispatch(resetSetIntervalID());
      // dispatch(resetCurrentScanNumber());
      // dispatch(setIsScanning(false));
    }
  }, [currentScanNumber]);

  function callReScanWrapper(idx: number, totalScan: number) {
    if (!WifiManager) return;
    WifiManager.reScanAndLoadWifiList().then(lists => {
      const listsSorted = lists.sort((a, b) => (a.level > b.level ? -1 : 1));
      dispatch(appendData(listsSorted));
      dispatch(incrementCurrentScanNumber());
      scanWifi(idx + 1, totalScan);
    });
  }

  function scanWifi(idx: number, totalScan: number) {
    if (idx === 1) {
      console.log(`Index = ${idx}`);
      callReScanWrapper(idx, totalScan);
    } else if (idx <= totalScan) {
      console.log('Pausing...');
      dispatch(setIsPausing(true));
      setTimeout(() => {
        console.log(`Done pausing. Continue at index = ${idx}`);
        dispatch(setIsPausing(false));
        callReScanWrapper(idx, totalScan);
      }, scanInterval);
    } else {
      console.log('End');
      dispatch(resetCurrentScanNumber());
      dispatch(setIsScanning(false));
      return;
    }
  }

  // function getWifiData() {
  //   if (WifiManager) {
  //     WifiManager.reScanAndLoadWifiList().then(lists => {
  //       const listsSorted = lists.sort((a, b) => (a.level > b.level ? -1 : 1));
  //       dispatch(appendData(listsSorted));
  //       // console.log('Finish scan at', currentScanNumber);
  //       // dispatch(setIsPausing(true));
  //     });
  //   } else {
  //     console.log('null wifimanager');
  //   }
  // }

  return {handleReadWifi};
}
