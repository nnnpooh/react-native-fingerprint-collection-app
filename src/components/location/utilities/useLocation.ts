import React from 'react';
import {useMutation} from 'react-query';
import {db} from 'src/utilities/firebase/firebase';
import {LocationFormDataType} from 'src/components/location/types/location';
import {UseFormSetError, UseFormReset} from 'react-hook-form';
import {SiteType, PointType} from 'src/components/location/types/location';
import {ModalType} from 'src/components/location/types/modal';
import {useAppSelector} from 'src/store/hook';
import uuid from 'react-native-uuid';

function useLocation(
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<LocationFormDataType>,
  setError: UseFormSetError<LocationFormDataType>,
  modalType: ModalType,
) {
  const {currentSite, currentPoint} = useAppSelector(state => state.location);

  async function addData(dataIn: LocationFormDataType) {
    const data = getFormattedData({
      text: dataIn.text,
      currentSite,
      currentPoint,
      modalType,
    });

    console.log({data, modalType});

    try {
      await db.doc(data.dbPath).set(data);
      return dataIn;
    } catch (error) {
      throw new Error('Error updating settings.');
    }
  }

  const {mutate} = useMutation((data: LocationFormDataType) => addData(data), {
    onSuccess: data => {
      setShowModal(false);
      if (modalType === 'ADD_POINT' || modalType === 'ADD_SITE') {
        reset(); //Reset to blank
      } else {
        reset(data);
      }
    },
    onError: () => {
      setError('submission', {message: 'Error updating settings.'});
    },
  });

  return {mutate};
}

export default useLocation;

type GetFormatFunctionType = (params: {
  text: string;
  currentSite: SiteType;
  currentPoint: PointType;
  modalType: ModalType;
}) => SiteType | PointType;

const getFormattedData: GetFormatFunctionType = ({
  text,
  currentSite,
  currentPoint,
  modalType,
}) => {
  const now = new Date();
  const keyGen = uuid.v4().slice(0, 6);
  // textOut = text.toLowerCase().replace(/\s/g, '_');
  let key = '';
  let docId = '';
  let dbPath = '';
  let data: SiteType | PointType;
  switch (modalType) {
    case 'ADD_SITE':
      key = `${keyGen}`;
      docId = key;
      dbPath = `_sites/${docId}`;
      data = {
        dbPath,
        docId,
        text: text.trim(),
        key,
        createdAt: now.getTime(),
        createdAtText: `${now.toDateString()} ${now.toLocaleTimeString()}`,
        updatedAt: null,
        updatedAtText: '',
        active: true,
      };
      break;
    case 'EDIT_SITE':
      data = {
        ...currentSite,
        text: text.trim(),
        updatedAt: now.getTime(),
        updatedAtText: `${now.toDateString()} ${now.toLocaleTimeString()}`,
      };
      break;
    case 'ADD_POINT':
      key = `${currentSite.key}_${keyGen}`;
      docId = key;
      dbPath = `_points/${docId}`;
      data = {
        dbPath,
        docId,
        text: text.trim(),
        key,
        createdAt: now.getTime(),
        createdAtText: `${now.toDateString()} ${now.toLocaleTimeString()}`,
        updatedAt: null,
        updatedAtText: '',
        active: true,
        siteDbPath: currentSite.dbPath,
        siteKey: currentSite.key,
        siteText: currentSite.text,
      };
      break;
    case 'EDIT_POINT':
      data = {
        ...currentPoint,
        text: text.trim(),
        updatedAt: now.getTime(),
        updatedAtText: `${now.toDateString()} ${now.toLocaleTimeString()}`,
      };
      break;
  }

  return data;
};
