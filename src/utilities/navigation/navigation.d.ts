import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  'Device Info': undefined;
  Record: undefined;
  'Sign In': undefined;
  Location: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SettingsProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;
export type DeviceInfoProps = NativeStackScreenProps<
  RootStackParamList,
  'Device Info'
>;
