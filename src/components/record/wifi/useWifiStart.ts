import React, {useEffect} from 'react';
import WifiManager from 'react-native-wifi-reborn';
import {useAppDispatch} from 'src/store/hook';
import {setCurrentSSID} from 'src/store/wifiSlice';

export default function useWifiStart() {
  const dispatch = useAppDispatch();

  function getWifiSSID() {
    if (WifiManager) {
      WifiManager.getCurrentWifiSSID()
        .then(ssid => {
          dispatch(setCurrentSSID(ssid));
          console.log('Your current connected wifi SSID is ' + ssid);
        })
        .catch(() => {
          dispatch(setCurrentSSID(''));
        });
    }
  }

  useEffect(() => {
    getWifiSSID();
  }, []);
}
