import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  Input,
  InputField,
  Button,
  ButtonText,
  VStack,
  HStack,
} from '@gluestack-ui/themed';
import { useQueryClient } from '@tanstack/react-query';
import { getApiBaseUrl, setApiBaseUrl, getDefaultBaseUrl } from '../../src/config/env';

export default function SettingsScreen() {
  const [url, setUrl] = useState('');
  const [saved, setSaved] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    getApiBaseUrl().then(setUrl);
  }, []);

  const handleSave = async () => {
    await setApiBaseUrl(url.trim());
    queryClient.clear();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
    const defaultUrl = getDefaultBaseUrl();
    setUrl(defaultUrl);
    await setApiBaseUrl(defaultUrl);
    queryClient.clear();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Box flex={1} bg="$backgroundLight50" p="$4">
      <VStack space="lg">
        <Heading size="lg" color="$textDark900">
          Settings
        </Heading>

        <Box>
          <Text fontWeight="$semibold" color="$textDark700" mb="$1">
            API Base URL
          </Text>
          <Text fontSize="$xs" color="$textLight500" mb="$2">
            Change this to connect to a different backend server
          </Text>
          <Input size="md" variant="outline" borderRadius="$lg" bg="$white">
            <InputField
              value={url}
              onChangeText={setUrl}
              placeholder="http://localhost:8000/api/v1"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />
          </Input>
        </Box>

        <HStack space="sm">
          <Button onPress={handleSave} action="primary" flex={1}>
            <ButtonText>Save</ButtonText>
          </Button>
          <Button onPress={handleReset} variant="outline" action="secondary">
            <ButtonText>Reset</ButtonText>
          </Button>
        </HStack>

        {saved && (
          <Text color="$success600" fontSize="$sm" textAlign="center">
            Settings saved! Cache cleared.
          </Text>
        )}

        <Box mt="$8" p="$4" bg="$white" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
          <Text fontWeight="$semibold" color="$textDark700" mb="$1">
            Cannavigator Mobile
          </Text>
          <Text fontSize="$xs" color="$textLight500">
            Version 1.0.0
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
