import React from 'react';
import { Pressable, Text, HStack, Badge, BadgeText, VStack } from '@gluestack-ui/themed';
import { Ligand } from '../types/disease';

interface LigandCardProps {
  ligand: Ligand;
  onPress: () => void;
}

function typeBadgeAction(type: string): 'success' | 'info' | 'warning' {
  if (type.toLowerCase().includes('cannabinoid')) return 'success';
  if (type.toLowerCase().includes('terpene')) return 'info';
  return 'warning';
}

export function LigandCard({ ligand, onPress }: LigandCardProps) {
  const synonyms = ligand.synonyms ?? [];

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
      <VStack gap="$1">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="$bold" fontSize="$md" color="$textDark900" flex={1}>
            {ligand.display_name}
          </Text>
          <Badge action={typeBadgeAction(ligand.type)} size="sm" borderRadius="$full">
            <BadgeText>{ligand.type}</BadgeText>
          </Badge>
        </HStack>

        {ligand.chemical_family ? (
          <Text fontSize="$xs" color="$textLight500">
            {ligand.chemical_family}
          </Text>
        ) : null}

        {synonyms.length > 0 ? (
          <Text fontSize="$2xs" color="$textLight400" numberOfLines={1}>
            {synonyms.slice(0, 4).join(' · ')}
          </Text>
        ) : null}
      </VStack>
    </Pressable>
  );
}
