import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {useAppDispatch} from 'src/store/hook';
import {useAppSelector} from 'src/store/hook';
import {setHasAccessFineLocation} from 'src/store/workingSlice';
export default function usePermission() {
  const {hasAccessFineLocation} = useAppSelector(state => state.working);
  const dispatch = useAppDispatch();

  async function getPermission() {
    if (hasAccessFineLocation) return;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for fingerprints networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission granted
      dispatch(setHasAccessFineLocation(true));
    } else {
      // Permission denied
      dispatch(setHasAccessFineLocation(false));
    }
  }

  useEffect(() => {
    getPermission();
  }, []);
}
