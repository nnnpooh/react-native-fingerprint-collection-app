import React, {FC} from 'react';
import {Collapse, Alert, HStack, VStack, Text} from 'native-base';

interface Props {
  text: string;
  open: boolean;
}
const RecordAlert: FC<Props> = ({text, open}) => {
  if (!open) return <></>;
  return (
    <Alert w="100%" colorScheme="success" status="success">
      <VStack space={2} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text color={'black'}>{text}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};

export default RecordAlert;
