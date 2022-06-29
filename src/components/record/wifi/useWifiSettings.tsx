import {useQuery, useQueryClient, useMutation} from 'react-query';
import {db} from 'src/utilities/firebase/firebase';

function addSettings(value: number) {
  console.log('add settings');
  return db.collection('test').doc('test').set({test: value});
}

async function getSettings() {
  console.log('GetSetting');
  const snapshot = await db.collection('test2').doc('test').get();
  if (snapshot.exists) {
    return snapshot.data();
  } else {
    throw new Error('Cannot find documents');
  }
}

function useSettings() {
  const queryClient = useQueryClient();

  const {data, error} = useQuery('settings', getSettings);

  const mutation = useMutation((value: number) => addSettings(value), {
    onSuccess: () => {
      queryClient.invalidateQueries('settings');
    },
  });

  return {data, mutation, error};
}

export default useSettings;
