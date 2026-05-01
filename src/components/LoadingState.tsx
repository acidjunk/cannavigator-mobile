import React from 'react';
import { Box, Spinner, Text } from '@gluestack-ui/themed';
import { colors } from '../theme/colors';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" p="$8">
      <Spinner size="large" color={colors.leaf} />
      <Text mt="$3" color="$textLight500" fontSize="$sm">
        {message}
      </Text>
    </Box>
  );
}
