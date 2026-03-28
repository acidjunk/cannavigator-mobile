import React from 'react';
import { Pressable, Box, Text, HStack, Badge, BadgeText, VStack } from '@gluestack-ui/themed';
import { LigandProfileCard as LigandProfileCardType } from '../types/ligand';

interface LigandCardProps {
  card: LigandProfileCardType;
  onPress: () => void;
}

function typeBadgeAction(type: string): 'success' | 'info' | 'warning' {
  if (type.toLowerCase().includes('cannabinoid')) return 'success';
  if (type.toLowerCase().includes('terpene')) return 'info';
  return 'warning';
}

export function LigandCard({ card, onPress }: LigandCardProps) {
  const dc = card.dashboard_card;

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
      <VStack space="sm">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="$bold" fontSize="$md" color="$textDark900" flex={1}>
            {card.ligand_display_name}
          </Text>
          <Badge action={typeBadgeAction(card.ligand_type)} size="sm" borderRadius="$full">
            <BadgeText>{card.ligand_type}</BadgeText>
          </Badge>
        </HStack>

        {dc?.headline && (
          <Text fontSize="$sm" fontWeight="$medium" color="$textDark700" numberOfLines={1}>
            {dc.headline}
          </Text>
        )}

        {dc?.tagline && (
          <Text fontSize="$xs" color="$textLight500" numberOfLines={2}>
            {dc.tagline}
          </Text>
        )}

        {dc?.disease_relevance && dc.disease_relevance.length > 0 && (
          <HStack flexWrap="wrap" space="xs" mt="$1">
            {dc.disease_relevance.slice(0, 3).map((tag) => (
              <Badge key={tag} size="sm" variant="outline" action="muted" borderRadius="$full">
                <BadgeText fontSize="$2xs">{tag}</BadgeText>
              </Badge>
            ))}
            {dc.disease_relevance.length > 3 && (
              <Text fontSize="$2xs" color="$textLight400">
                +{dc.disease_relevance.length - 3} more
              </Text>
            )}
          </HStack>
        )}
      </VStack>
    </Pressable>
  );
}
