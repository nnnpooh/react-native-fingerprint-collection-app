import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WifiEntry} from 'react-native-wifi-reborn';
export interface WifiState {
  currentSSID: string;
  data: WifiEntry[][];
  isScanning: boolean;
  totalScan: number;
  scanInterval: number;
  currentScanNumber: number;
  currentDataIndex: number;
  setIntervalID: NodeJS.Timer | null;
  isPausing: boolean;
}

const initialState: WifiState = {
  data: [] as WifiEntry[][],
  currentSSID: '',
  isScanning: false,
  totalScan: 10,
  scanInterval: 1000,
  currentScanNumber: 1,
  currentDataIndex: 0,
  setIntervalID: null,
  isPausing: false,
};

export interface WifiSettingTypes {
  totalScan: number;
  scanInterval: number;
}

export const wifiSlice = createSlice({
  name: 'wifi',
  initialState: initialState,
  reducers: {
    appendData: (state, action: PayloadAction<WifiEntry[]>) => {
      state.data.push(action.payload);
    },
    resetData: state => {
      state.data = [];
    },

    setCurrentSSID: (state, action: PayloadAction<string>) => {
      state.currentSSID = action.payload;
    },
    setIsScanning: (state, action: PayloadAction<boolean>) => {
      state.isScanning = action.payload;
    },
    incrementCurrentScanNumber: state => {
      state.currentScanNumber += 1;
    },
    resetCurrentScanNumber: state => {
      state.currentScanNumber = 1;
    },
    setSettings: (state, action: PayloadAction<WifiSettingTypes>) => {
      state.totalScan = action.payload.totalScan;
      state.scanInterval = action.payload.scanInterval;
    },
    incrementCurrentDataIndex: state => {
      state.currentDataIndex += 1;
    },
    decrementCurrentDataIndex: state => {
      state.currentDataIndex -= 1;
    },
    resetCurrentDataIndex: state => {
      state.currentDataIndex = 0;
    },
    setSetIntervalID: (state, action: PayloadAction<NodeJS.Timer>) => {
      state.setIntervalID = action.payload;
    },
    resetSetIntervalID: state => {
      state.setIntervalID = null;
    },
    setIsPausing: (state, action: PayloadAction<boolean>) => {
      state.isPausing = action.payload;
      console.log('Set pasing to', state.isPausing ? 'True' : 'false');
    },
  },
});

export const {
  appendData,
  setCurrentSSID,
  setIsScanning,
  resetData,
  incrementCurrentScanNumber,
  resetCurrentScanNumber,
  setSettings,
  incrementCurrentDataIndex,
  decrementCurrentDataIndex,
  resetCurrentDataIndex,
  setSetIntervalID,
  resetSetIntervalID,
  setIsPausing,
} = wifiSlice.actions;

export default wifiSlice.reducer;
