import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {deviceInfoType} from 'src/components/deviceInfo/types/deviceInfo';

export interface WorkingState {
  deviceInfo: deviceInfoType;
  hasAccessFineLocation: boolean;
  email: string;
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
  },
});

export const {setDeviceInfo, setHasAccessFineLocation, setEmail} =
  workingSlice.actions;

export default workingSlice.reducer;
