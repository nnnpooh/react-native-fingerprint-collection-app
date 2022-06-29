import React, {FC} from 'react';
import {Input, Stack, Text} from 'native-base';
import {Controller, Control, FormState, UseFormReturn} from 'react-hook-form';
import {LocationFormDataType} from 'src/components/location/types/location';
import {ModalType} from 'src/components/location/types/modal';

interface Props {
  form: UseFormReturn<LocationFormDataType>;
  type: ModalType;
}

const LocationModalContent: FC<Props> = ({form, type}) => {
  return (
    <Stack mt={8} mx={8} space={4} alignItems="center">
      <Text color="gray.500">Site Name</Text>
      <Controller
        name="text"
        control={form.control}
        render={({field}) => (
          <Input
            size="2xl"
            placeholder="Name"
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      <Text color="red.500">{form.formState.errors?.text?.message || ''}</Text>
    </Stack>
  );
};

export default LocationModalContent;
