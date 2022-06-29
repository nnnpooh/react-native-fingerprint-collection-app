import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {SettingFormDataType} from 'src/components/settings/types/settings';
import {useAppSelector} from 'src/store/hook';

const schema = yup.object({
  totalScan: yup.number().integer().positive().max(1000).required(),
  scanInterval: yup
    .number()
    .integer()
    .positive()
    .min(100)
    .max(1000000)
    .required(),
});

function useSettingForm() {
  const {totalScan, scanInterval} = useAppSelector(state => state.wifi);

  const {handleSubmit, watch, control, formState, reset, setError} =
    useForm<SettingFormDataType>({
      resolver: yupResolver(schema),
      mode: 'onChange',
      defaultValues: {
        totalScan: totalScan,
        scanInterval: scanInterval,
        submission: null,
      },
    });

  return {handleSubmit, watch, control, formState, reset, setError};
}

export default useSettingForm;
