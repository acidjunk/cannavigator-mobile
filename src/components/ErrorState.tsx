import React from 'react';
import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" p="$8">
      <Text color="$error600" fontWeight="$semibold" fontSize="$md" mb="$2">
        Error
      </Text>
      <Text color="$textLight500" fontSize="$sm" textAlign="center" mb="$4">
        {message}
      </Text>
      {onRetry && (
        <Button size="sm" variant="outline" onPress={onRetry}>
          <ButtonText>Retry</ButtonText>
        </Button>
      )}
    </Box>
  );
}
