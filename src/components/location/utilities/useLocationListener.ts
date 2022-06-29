import React, {useEffect} from 'react';
import {useAppSelector} from 'src/store/hook';
import {useAppDispatch} from 'src/store/hook';
import {db} from 'src/utilities/firebase/firebase';
import {
  setSites,
  setPoints,
  resetSites,
  resetPoints,
} from 'src/store/locationSlice';
import {SiteType, PointType} from 'src/components/location/types/location';

function useLocationListener() {
  const {currentSite} = useAppSelector(state => state.location);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetSites());
    const subscriber = db.collection('_sites').onSnapshot(querySnapShot => {
      const docChange = querySnapShot.docChanges();
      docChange.forEach(change => {
        const payload = change.doc.data() as SiteType;
        const type = change.type;
        // console.log({payload, type});
        dispatch(setSites({payload, type}));
      });
    });

    return () => subscriber();
  }, []);

  useEffect(() => {
    dispatch(resetPoints());
    const subscriber = db
      .collection('_points')
      .where('siteKey', '==', currentSite.key)
      .onSnapshot(querySnapShot => {
        const docChange = querySnapShot.docChanges();
        docChange.forEach(change => {
          const payload = change.doc.data() as PointType;
          const type = change.type;
          console.log({payload, type});
          dispatch(setPoints({payload, type}));
        });
      });
    return () => subscriber();
  }, [currentSite.key]);
}

export default useLocationListener;
