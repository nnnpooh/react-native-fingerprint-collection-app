import React, {useEffect} from 'react';
import {db} from 'src/utilities/firebase/firebase';
import {useAppSelector} from 'src/store/hook';
function useInitializeSettings() {
  const {email} = useAppSelector(state => state.working);
  const {scanInterval, totalScan} = useAppSelector(state => state.wifi);

  async function initializeSettings() {
    const docRef = db.collection('_users').doc(email);
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      try {
        await docRef.set({wifi: {scanInterval, totalScan}});
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (!email) return;
    initializeSettings();
  }, [email]);
}

export default useInitializeSettings;
