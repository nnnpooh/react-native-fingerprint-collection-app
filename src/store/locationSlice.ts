import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SiteType, PointType} from 'src/components/location/types/location';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface LocationState {
  currentSite: SiteType;
  currentPoint: PointType;
  sites: SiteType[];
  points: PointType[];
}

const blankSite = {
  createdAt: 0,
  createdAtText: '',
  dbPath: '',
  docId: '',
  key: '',
  text: '',
  updatedAt: 0,
  updatedAtText: '',
  active: false,
};

const blankPoint = {
  ...blankSite,
  siteDbPath: '',
  siteKey: '',
  siteText: '',
  totalScans: 0,
  totalFingerprints: 0,
};

const initialState: LocationState = {
  currentPoint: blankPoint,
  currentSite: blankSite,
  sites: <SiteType[]>[],
  points: <PointType[]>[],
};

export const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    setSites: (
      state,
      action: PayloadAction<{
        payload: SiteType;
        type: FirebaseFirestoreTypes.DocumentChangeType;
      }>,
    ) => {
      let temp = state.sites.slice(0);
      const data = action.payload.payload;
      switch (action.payload.type) {
        case 'added':
          temp.push(data);
          break;
        case 'modified':
          temp = temp.filter(el => el.key !== data.key);
          temp.push(data);
          // Update current site if the modified data is the current site.
          if (state.currentSite.key === data.key) state.currentSite = data;
          break;
        case 'removed':
          temp = temp.filter(el => el.key !== data.key);
          break;
      }
      state.sites = temp.sort((a, b) => a.text.localeCompare(b.text, 'en'));
    },

    setPoints: (
      state,
      action: PayloadAction<{
        payload: PointType;
        type: FirebaseFirestoreTypes.DocumentChangeType;
      }>,
    ) => {
      let temp = state.points.slice(0);
      const data = action.payload.payload;
      switch (action.payload.type) {
        case 'added':
          temp.push(data);
          break;
        case 'modified':
          temp = temp.filter(el => el.key !== data.key);
          temp.push(data);
          // Update current point if the modified data is the current point.
          if (state.currentPoint.key === data.key) state.currentPoint = data;
          break;
        case 'removed':
          temp = temp.filter(el => el.key !== data.key);
          break;
      }
      state.points = temp.sort((a, b) => a.text.localeCompare(b.text, 'en'));
    },

    resetSites(state) {
      state.sites = <SiteType[]>[];
    },

    resetPoints(state) {
      state.points = <PointType[]>[];
    },

    setCurrentSite(state, action: PayloadAction<string>) {
      const site = state.sites.find(el => el.key === action.payload);
      if (site) {
        state.currentSite = site;
        state.currentPoint = blankPoint;
      }
    },

    setCurrentPoint(state, action: PayloadAction<string>) {
      const point = state.points.find(el => el.key === action.payload);
      if (point) state.currentPoint = point;
    },
  },
});

export const {
  setSites,
  setCurrentSite,
  setPoints,
  setCurrentPoint,
  resetSites,
  resetPoints,
} = locationSlice.actions;

export default locationSlice.reducer;
