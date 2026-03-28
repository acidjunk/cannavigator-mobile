import React from 'react';
import { ScrollView } from 'react-native';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  BadgeText,
  Divider,
  Pressable,
} from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useLigandProfile, useLigandDiseases } from '../../src/hooks/useLigands';
import { TargetBadge } from '../../src/components/TargetBadge';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';

export default function ProfileDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const { data: profile, isLoading, isError, refetch } = useLigandProfile(slug);
  const { data: linkedDiseases } = useLigandDiseases(slug);

  if (isLoading) return <LoadingState />;
  if (isError || !profile) return <ErrorState message="Failed to load profile" onRetry={refetch} />;

  const dc = profile.dashboard_card;

  return (
    <>
      <Stack.Screen options={{ title: slug }} />
      <ScrollView style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <VStack p="$4" space="lg">
          {/* Dashboard Card */}
          {dc && (
            <Box bg="$primary50" p="$4" borderRadius="$lg" borderWidth={1} borderColor="$primary200">
              {dc.headline && (
                <Heading size="md" color="$primary800" mb="$1">
                  {dc.headline}
                </Heading>
              )}
              {dc.tagline && (
                <Text fontSize="$sm" color="$primary600" mb="$3">
                  {dc.tagline}
                </Text>
              )}

              {/* Top Targets */}
              {dc.top_targets && dc.top_targets.length > 0 && (
                <Box mb="$3">
                  <Text fontWeight="$semibold" fontSize="$xs" color="$textDark700" mb="$1">
                    Top Targets
                  </Text>
                  {dc.top_targets.map((t, i) => (
                    <Box key={i} py="$1">
                      <Text fontSize="$sm" fontWeight="$medium" color="$textDark800">
                        {t.target}
                      </Text>
                      <HStack space="sm">
                        {t.potency && (
                          <Text fontSize="$2xs" color="$textLight500">
                            {t.potency}
                          </Text>
                        )}
                        {t.comment && (
                          <Text fontSize="$2xs" color="$textLight500">
                            {t.comment}
                          </Text>
                        )}
                      </HStack>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Disease Relevance Tags */}
              {dc.disease_relevance && dc.disease_relevance.length > 0 && (
                <HStack flexWrap="wrap" space="xs">
                  {dc.disease_relevance.map((tag) => (
                    <Badge key={tag} size="sm" action="success" borderRadius="$full" mb="$1">
                      <BadgeText fontSize="$2xs">{tag}</BadgeText>
                    </Badge>
                  ))}
                </HStack>
              )}
            </Box>
          )}

          {/* Mechanistic Highlights */}
          {dc?.mechanistic_highlights && dc.mechanistic_highlights.length > 0 && (
            <Box bg="$white" p="$4" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
              <Heading size="sm" color="$textDark700" mb="$3">
                Mechanistic Highlights
              </Heading>
              {dc.mechanistic_highlights.map((h, i) => (
                <HStack key={i} space="sm" mb="$2" alignItems="flex-start">
                  <Text color="$primary500" fontSize="$sm">
                    {'\u2022'}
                  </Text>
                  <Text fontSize="$sm" color="$textDark600" flex={1}>
                    {h}
                  </Text>
                </HStack>
              ))}
            </Box>
          )}

          {/* Summary Sections */}
          {profile.summary &&
            Object.entries(profile.summary).map(([key, section]) => (
              <Box
                key={key}
                bg="$white"
                p="$4"
                borderRadius="$lg"
                borderWidth={1}
                borderColor="$borderLight200"
              >
                <Heading size="sm" color="$textDark700" mb="$3">
                  {section.title}
                </Heading>
                {section.bullets.map((b, i) => (
                  <HStack key={i} space="sm" mb="$2" alignItems="flex-start">
                    <Text color="$primary500" fontSize="$sm">
                      {'\u2022'}
                    </Text>
                    <Text fontSize="$sm" color="$textDark600" flex={1}>
                      {b}
                    </Text>
                  </HStack>
                ))}
              </Box>
            ))}

          {/* Linked Diseases */}
          {linkedDiseases && linkedDiseases.length > 0 && (
            <Box bg="$white" p="$4" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
              <Heading size="sm" color="$textDark700" mb="$3">
                Linked Diseases ({linkedDiseases.length})
              </Heading>
              {linkedDiseases.map((d) => (
                <Pressable
                  key={d.id}
                  onPress={() => router.push(`/diseases/${d.slug}`)}
                  py="$2"
                  borderBottomWidth={1}
                  borderBottomColor="$borderLight100"
                >
                  <Text fontSize="$sm" color="$primary700" fontWeight="$medium">
                    {d.display_name}
                  </Text>
                </Pressable>
              ))}
            </Box>
          )}
        </VStack>
      </ScrollView>
    </>
  );
}
