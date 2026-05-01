import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Text, Heading, VStack, HStack, Pressable } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useLigandProfile } from '../../src/hooks/useLigands';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';
import { brand, colors } from '../../src/theme/colors';

export default function ProfileDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const { data: profile, isLoading, isError, refetch } = useLigandProfile(slug);

  if (isLoading) return <LoadingState />;
  if (isError || !profile) return <ErrorState message="Failed to load profile" onRetry={refetch} />;

  return (
    <>
      <Stack.Screen options={{ title: profile.display_name }} />
      <ScrollView style={{ flex: 1, backgroundColor: colors.cream }}>
        <VStack p="$4" gap="$4">
          {/* Header */}
          <Box
            bg={`${brand.sage}15`}
            p="$4"
            borderRadius="$lg"
            borderWidth={1}
            borderColor={`${brand.sage}40`}
          >
            <Heading size="lg" color={brand.darkGreen} mb="$1">
              {profile.display_name}
            </Heading>
            <Text fontSize="$xs" color={brand.sage} mb="$2" textTransform="uppercase">
              {profile.type}
              {profile.chemical_family ? ` · ${profile.chemical_family}` : ''}
            </Text>
            {profile.tagline ? (
              <Text fontSize="$sm" color="$textDark700" fontWeight="$medium" mb="$2">
                {profile.tagline}
              </Text>
            ) : null}
            {profile.short_description ? (
              <Text fontSize="$sm" color="$textDark600" lineHeight="$lg">
                {profile.short_description}
              </Text>
            ) : null}
          </Box>

          {/* Targets */}
          {profile.targets.length > 0 ? (
            <Box
              bg="$white"
              p="$4"
              borderRadius="$lg"
              borderWidth={1}
              borderColor="$borderLight200"
            >
              <Heading size="sm" color="$textDark700" mb="$3">
                Targets ({profile.targets.length})
              </Heading>
              {profile.targets
                .slice()
                .sort((a, b) => b.total_mentions - a.total_mentions)
                .slice(0, 12)
                .map((tm) => (
                  <HStack
                    key={tm.target.id}
                    justifyContent="space-between"
                    alignItems="center"
                    py="$2"
                    borderBottomWidth={1}
                    borderBottomColor="$borderLight100"
                  >
                    <VStack flex={1}>
                      <Text fontWeight="$medium" fontSize="$sm" color="$textDark800">
                        {tm.target.display_name}
                      </Text>
                      <Text fontSize="$2xs" color="$textLight500">
                        {tm.target.type}
                      </Text>
                    </VStack>
                    <Text fontSize="$xs" color="$textLight400">
                      {tm.paper_count} paper{tm.paper_count === 1 ? '' : 's'}
                    </Text>
                  </HStack>
                ))}
            </Box>
          ) : null}

          {/* Diseases (replaces old reverse-route fetch) */}
          {profile.diseases.length > 0 ? (
            <Box
              bg="$white"
              p="$4"
              borderRadius="$lg"
              borderWidth={1}
              borderColor="$borderLight200"
            >
              <Heading size="sm" color="$textDark700" mb="$3">
                Linked Diseases ({profile.diseases.length})
              </Heading>
              {profile.diseases
                .slice()
                .sort((a, b) => b.total_mentions - a.total_mentions)
                .slice(0, 12)
                .map((dm) => (
                  <Pressable
                    key={dm.disease.id}
                    onPress={() => router.push(`/diseases/${dm.disease.slug}`)}
                    py="$2"
                    borderBottomWidth={1}
                    borderBottomColor="$borderLight100"
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text fontSize="$sm" color={brand.sage} fontWeight="$medium" flex={1}>
                        {dm.disease.display_name}
                      </Text>
                      <Text fontSize="$xs" color="$textLight400">
                        {dm.paper_count} paper{dm.paper_count === 1 ? '' : 's'}
                      </Text>
                    </HStack>
                  </Pressable>
                ))}
            </Box>
          ) : null}

          {/* Interactions summary */}
          {profile.interactions.length > 0 ? (
            <Box
              bg="$white"
              p="$4"
              borderRadius="$lg"
              borderWidth={1}
              borderColor="$borderLight200"
            >
              <Heading size="sm" color="$textDark700" mb="$3">
                Interactions ({profile.interactions.length})
              </Heading>
              {profile.interactions.slice(0, 8).map((it) => (
                <HStack
                  key={it.id}
                  justifyContent="space-between"
                  alignItems="center"
                  py="$2"
                  borderBottomWidth={1}
                  borderBottomColor="$borderLight100"
                >
                  <Text fontSize="$sm" color="$textDark800" flex={1}>
                    {it.target_display_name}
                  </Text>
                  <Text fontSize="$xs" color="$textLight500">
                    {it.effect}
                    {it.potency_nm ? ` · ${it.potency_nm} nM` : ''}
                  </Text>
                </HStack>
              ))}
            </Box>
          ) : null}
        </VStack>
      </ScrollView>
    </>
  );
}
