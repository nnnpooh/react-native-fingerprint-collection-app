import React, {useEffect, useState, useRef} from 'react';
import {
  getUniqueId,
  getManufacturer,
  getDeviceId,
  getCarrier,
  getModel,
} from 'react-native-device-info';
import {useAppDispatch} from 'src/store/hook';
import {setDeviceInfo} from 'src/store/workingSlice';

async function getDeviceInfo() {
  const uniqueId = getUniqueId();
  const model = getModel();
  const deviceId = getDeviceId();
  const manufacturer = await getManufacturer();
  const carrier = await getCarrier();
  return {uniqueId, model, deviceId, manufacturer, carrier};
}

function useDeviceInfo() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getDeviceInfo().then(data => dispatch(setDeviceInfo(data)));
  }, []);
}

export default useDeviceInfo;
