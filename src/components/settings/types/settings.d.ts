import {WifiSettingTypes} from 'src/store/wifiSlice';

export interface SettingsTypesDB {
  wifi: WifiSettingTypes;
}

export interface SettingFormDataType {
  totalScan: number;
  scanInterval: number;
  submission: null; // Used to hold submission error
}
