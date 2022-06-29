import React, {FC} from 'react';
import {Input, Stack, Text} from 'native-base';
import {Controller, Control, FormState} from 'react-hook-form';
import {SettingFormDataType} from 'src/components/settings/types/settings';

interface Props {
  control: Control<SettingFormDataType>;
  formState: FormState<SettingFormDataType>;
}
const SettingModalContent: FC<Props> = ({control, formState}) => {
  return (
    <Stack mt={8} mx={8} space={4} alignItems="center">
      <Text color="gray.500">Total Scan (times)</Text>
      <Controller
        name="totalScan"
        control={control}
        render={({field}) => (
          <Input
            size="2xl"
            placeholder="Total Scan"
            onChangeText={field.onChange}
            value={String(field.value)}
          />
        )}
      />
      <Text color="red.500">{formState.errors?.totalScan?.message || ''}</Text>

      <Text color="gray.500">Scan Interval (ms)</Text>
      <Controller
        name="scanInterval"
        control={control}
        render={({field}) => (
          <Input
            size="2xl"
            placeholder="Scan Interval"
            onChangeText={field.onChange}
            value={String(field.value)}
          />
        )}
      />

      <Text color="red.500">
        {formState.errors?.scanInterval?.message || ''}
      </Text>
    </Stack>
  );
};

export default SettingModalContent;
