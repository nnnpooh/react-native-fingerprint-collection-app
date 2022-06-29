import React, {useEffect} from 'react';
import {db} from 'src/utilities/firebase/firebase';
import {useAppSelector} from 'src/store/hook';
import {useAppDispatch} from 'src/store/hook';
import {setSettings as setWifiSettings} from 'src/store/wifiSlice';
import {SettingsTypesDB} from 'src/components/settings/types/settings';
function useSettingListener() {
  const {email} = useAppSelector(state => state.working);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!email) return;

    const subscriber = db
      .collection('_users')
      .doc(email)
      .onSnapshot(documentSnapshot => {
        if (!documentSnapshot.exists) return;
        const settings = documentSnapshot.data() as SettingsTypesDB;
        dispatch(setWifiSettings(settings.wifi));
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [email]);
}

export default useSettingListener;
