import React from 'react';
import { Box, HStack, Text } from '@gluestack-ui/themed';

interface ScoreBarProps {
  score: number | null;
  aligned: number;
  counter: number;
}

function scoreColor(score: number): string {
  if (score >= 0.7) return '$success500';
  if (score >= 0.4) return '$warning500';
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
