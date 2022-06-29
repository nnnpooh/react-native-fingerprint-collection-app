import React from 'react';
import {useMutation} from 'react-query';
import {db} from 'src/utilities/firebase/firebase';
import {SettingFormDataType} from 'src/components/settings/types/settings';
import {useAppSelector} from 'src/store/hook';
import {UseFormSetError, UseFormReset} from 'react-hook-form';

function useSettings(
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<SettingFormDataType>,
  setError: UseFormSetError<SettingFormDataType>,
) {
  const {email} = useAppSelector(state => state.working);

  async function addSettings(data: SettingFormDataType) {
    const {submission, ...dataWifi} = data;

    try {
      await db
        .collection('_users')
        .doc(email)
        .set({wifi: dataWifi}, {merge: true});
      return data;
    } catch (error) {
      throw new Error('Error updating settings.');
    }
  }

  const {mutate} = useMutation(
    (data: SettingFormDataType) => addSettings(data),
    {
      onSuccess: data => {
        setShowModal(false);
        reset(data);
      },
      onError: () => {
        setError('submission', {message: 'Error updating settings.'});
      },
    },
  );

  return {mutate};
}

export default useSettings;
