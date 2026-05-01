import React from 'react';
import { Box, HStack, Text } from '@gluestack-ui/themed';
import { colors } from '../theme/colors';

interface ScoreBarProps {
  score: number | null;
  aligned: number;
  counter: number;
}

function scoreColor(score: number): string {
  // High-fit results draw the eye in brand gold; mid stays leaf-green; low stays warning/error.
  if (score >= 0.8) return colors.gold;
  if (score >= 0.5) return '$success500';
  if (score >= 0.3) return '$warning500';
  return '$error500';
}

export function ScoreBar({ score, aligned, counter }: ScoreBarProps) {
  const displayScore = score ?? 0;
  const pct = Math.round(displayScore * 100);

  return (
    <Box>
      <HStack justifyContent="space-between" mb="$1">
        <Text fontSize="$xs" color="$textLight500">
          Score: {pct}%
        </Text>
        <Text fontSize="$xs" color="$textLight500">
          {aligned} aligned / {counter} counter
        </Text>
      </HStack>
      <Box bg="$backgroundLight200" borderRadius="$full" h="$1.5" overflow="hidden">
        <Box bg={scoreColor(displayScore)} h="$1.5" borderRadius="$full" w={`${pct}%`} />
      </Box>
    </Box>
  );
}
