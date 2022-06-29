import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {deviceInfoType} from 'src/components/deviceInfo/types/deviceInfo';

export interface WorkingState {
  deviceInfo: deviceInfoType;
  hasAccessFineLocation: boolean;
  email: string;
  readFingerprint: boolean;
}

const blankDeviceInfo = {
  uniqueId: '',
  model: '',
  deviceId: '',
  manufacturer: '',
  carrier: '',
};

const initialState: WorkingState = {
  deviceInfo: blankDeviceInfo,
  hasAccessFineLocation: false,
  email: '',
  readFingerprint: false,
};

export const workingSlice = createSlice({
  name: 'working',
  initialState: initialState,
  reducers: {
    setDeviceInfo: (state, action: PayloadAction<deviceInfoType>) => {
      state.deviceInfo = action.payload;
    },
    setHasAccessFineLocation: (state, action: PayloadAction<boolean>) => {
      state.hasAccessFineLocation = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setReadFingerprint: (state, action: PayloadAction<boolean>) => {
      state.readFingerprint = action.payload;
    },
  },
});

export const {
  setDeviceInfo,
  setHasAccessFineLocation,
  setEmail,
  setReadFingerprint,
} = workingSlice.actions;

export default workingSlice.reducer;
