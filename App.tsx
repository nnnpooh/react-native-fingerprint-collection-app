import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {store} from 'src/store/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClientProvider, QueryClient} from 'react-query';
import {RootStackParamList} from 'src/utilities/navigation/navigation';
import HomeScreen from 'src/components/home/HomeScreen';
import SettingsScreen from 'src/components/settings/SettingScreen';
import DeviceInfoScreen from 'src/components/deviceInfo/DeviceInfoScreen';
import useDeviceInfo from 'src/components/deviceInfo/useDeviceInfo';
import usePermission from 'src/utilities/permission/usePermission';
import RecordScreen from 'src/components/record/RecordScreen';
import SignInScreen from 'src/components/auth/SignInScreen';
import LocationScreen from 'src/components/location/LocationScreen';
import useWifiStart from 'src/components/record/wifi/useWifiStart';
import useAuthListener from 'src/components/auth/useAuthListener';
import useInitializeSettings from 'src/components/settings/utilities/useInitializeSettings';
import useSettingListener from 'src/components/settings/utilities/useSettingListener';
import useLocationListener from 'src/components/location/utilities/useLocationListener';
function AppStack() {
  const {user, initializing} = useAuthListener();
  useDeviceInfo();
  usePermission();
  useWifiStart();
  useInitializeSettings();
  useSettingListener();
  useLocationListener();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Sign In" component={SignInScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Device Info" component={DeviceInfoScreen} />
            <Stack.Screen name="Record" component={RecordScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <AppStack />
        </NativeBaseProvider>
      </QueryClientProvider>
    </Provider>
  );
}
