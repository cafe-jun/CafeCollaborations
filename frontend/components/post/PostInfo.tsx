import { Text, VStack, HStack, Link, Icon } from '@chakra-ui/react';
import { CalendarIcon, TimeIcon, ChatIcon } from '@chakra-ui/icons';
import { getLabelByFormValue } from './FormOptions';

export default function PostInfo({
  region,
  duration,
  recruitMember,
  category,
}) {
  return (
    <HStack
      spacing={8}
      justify="space-between"
      bg="gray.50"
      p={4}
      borderRadius="md"
    >
      <VStack align="start" spacing={2}>
        <HStack>
          <Text fontWeight="bold" fontSize={'large'}>
            업종 구분:
          </Text>
          <Text fontSize={'large'}>
            {getLabelByFormValue('category', category)}
          </Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold" fontSize={'large'}>
            모집 인원:
          </Text>
          <Text fontSize={'large'}>
            {getLabelByFormValue('recruitMember', recruitMember)}
          </Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold" fontSize={'large'}>
            활동 기간:
          </Text>
          <Text fontSize={'large'}>
            {getLabelByFormValue('duration', duration)}
          </Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold" fontSize={'large'}>
            지역 :
          </Text>
          <Text fontSize={'large'}>
            {getLabelByFormValue('region', region)}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
