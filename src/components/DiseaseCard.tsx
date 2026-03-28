import React from 'react';
import { Pressable, Box, Text, HStack, Icon } from '@gluestack-ui/themed';
import { ChevronRight } from 'lucide-react-native';
import { Disease } from '../types/disease';

interface DiseaseCardProps {
  disease: Disease;
  onPress: () => void;
}

export function DiseaseCard({ disease, onPress }: DiseaseCardProps) {
  return (
    <Pressable
      onPress={onPress}
      bg="$white"
      p="$4"
      mb="$2"
      borderRadius="$lg"
      borderWidth={1}
      borderColor="$borderLight200"
      sx={{ ':active': { bg: '$backgroundLight100' } }}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Box flex={1} mr="$2">
          <Text fontWeight="$semibold" fontSize="$md" color="$textDark900">
            {disease.display_name}
          </Text>
          {disease.source_url && (
            <Text fontSize="$xs" color="$textLight500" numberOfLines={1} mt="$1">
              {disease.source_url}
            </Text>
          )}
        </Box>
        <Icon as={ChevronRight} size="sm" color="$textLight400" />
      </HStack>
    </Pressable>
  );
}
