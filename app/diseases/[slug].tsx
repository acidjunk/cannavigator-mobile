import React from 'react';
import { ScrollView } from 'react-native';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Divider,
  Pressable,
} from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useDiseaseDetail, useDiseaseProducts } from '../../src/hooks/useDiseases';
import { TargetBadge } from '../../src/components/TargetBadge';
import { EffectChip } from '../../src/components/EffectChip';
import { ScoreBar } from '../../src/components/ScoreBar';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';

export default function DiseaseDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const { data: disease, isLoading, isError, refetch } = useDiseaseDetail(slug);
  const { data: products } = useDiseaseProducts(slug);

  if (isLoading) return <LoadingState />;
  if (isError || !disease) return <ErrorState message="Failed to load disease" onRetry={refetch} />;

  return (
    <>
      <Stack.Screen options={{ title: disease.display_name }} />
      <ScrollView style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <VStack p="$4" gap="$4">
          {/* Header */}
          <Box>
            <Heading size="xl" color="$textDark900">
              {disease.display_name}
            </Heading>
            {disease.source_url && (
              <Text fontSize="$xs" color="$primary600" mt="$1">
                {disease.source_url}
              </Text>
            )}
          </Box>

          {/* Targets */}
          {disease.targets.length > 0 && (
            <Box bg="$white" p="$4" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
              <Heading size="sm" color="$textDark700" mb="$3">
                Targets ({disease.targets.length})
              </Heading>
              {disease.targets
                .sort((a, b) => b.frequency - a.frequency)
                .map((dt) => (
                  <HStack
                    key={dt.target.id}
                    justifyContent="space-between"
                    alignItems="center"
                    py="$2"
                    borderBottomWidth={1}
                    borderBottomColor="$borderLight100"
                  >
                    <HStack alignItems="center" gap="$2" flex={1}>
                      <TargetBadge name={dt.target.display_name} type={dt.target.type} />
                      {dt.role && (
                        <Text fontSize="$xs" color="$textLight500">
                          {dt.role}
                        </Text>
                      )}
                    </HStack>
                    <Text fontSize="$xs" color="$textLight400">
                      freq: {dt.frequency}
                    </Text>
                  </HStack>
                ))}
            </Box>
          )}

          {/* Ligands */}
          {disease.ligands.length > 0 && (
            <Box bg="$white" p="$4" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
              <Heading size="sm" color="$textDark700" mb="$3">
                Cannabis Compounds ({disease.ligands.length})
              </Heading>
              {disease.ligands
                .sort((a, b) => b.frequency - a.frequency)
                .map((dl) => (
                  <Pressable
                    key={dl.ligand.id}
                    onPress={() => router.push(`/profiles/${dl.ligand.slug}`)}
                    py="$2"
                    borderBottomWidth={1}
                    borderBottomColor="$borderLight100"
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <VStack flex={1}>
                        <Text fontWeight="$medium" color="$primary700" fontSize="$sm">
                          {dl.ligand.display_name}
                        </Text>
                        {dl.category && (
                          <Text fontSize="$2xs" color="$textLight500">
                            {dl.category}
                          </Text>
                        )}
                      </VStack>
                      <Text fontSize="$xs" color="$textLight400">
                        freq: {dl.frequency}
                      </Text>
                    </HStack>
                  </Pressable>
                ))}
            </Box>
          )}

          {/* Desired Effects */}
          {disease.desired_effects.length > 0 && (
            <Box bg="$white" p="$4" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
              <Heading size="sm" color="$textDark700" mb="$3">
                Desired Effects ({disease.desired_effects.length})
              </Heading>
              {disease.desired_effects.map((de) => (
                <Box
                  key={`${de.target.id}-${de.desired_effect}`}
                  py="$2"
                  borderBottomWidth={1}
                  borderBottomColor="$borderLight100"
                >
                  <HStack alignItems="center" gap="$2" flexWrap="wrap">
                    <Text fontSize="$sm" fontWeight="$medium" color="$textDark800">
                      {de.target.display_name}
                    </Text>
                    <EffectChip effect={de.desired_effect} confidence={de.confidence} />
                    {de.is_override && (
                      <Text fontSize="$2xs" color="$warning600" fontWeight="$bold">
                        OVERRIDE
                      </Text>
                    )}
                  </HStack>
                  {de.evidence && (
                    <Text fontSize="$xs" color="$textLight500" mt="$1" numberOfLines={3}>
                      {de.evidence}
                    </Text>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* Products */}
          {products && products.length > 0 && (
            <Box bg="$white" p="$4" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
              <Heading size="sm" color="$textDark700" mb="$3">
                Recommended Products ({products.length})
              </Heading>
              {products
                .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
                .map((ps) => (
                  <Box
                    key={ps.product.id}
                    py="$3"
                    borderBottomWidth={1}
                    borderBottomColor="$borderLight100"
                  >
                    <Text fontWeight="$medium" fontSize="$sm" color="$textDark800" mb="$1">
                      {ps.product.display_name}
                    </Text>
                    <ScoreBar score={ps.score} aligned={ps.aligned_count} counter={ps.counter_count} />
                  </Box>
                ))}
            </Box>
          )}

          {/* Literature */}
          {disease.literature_text && (
            <Box bg="$white" p="$4" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
              <Heading size="sm" color="$textDark700" mb="$3">
                Literature
              </Heading>
              <Text fontSize="$sm" color="$textDark600" lineHeight="$lg">
                {disease.literature_text}
              </Text>
            </Box>
          )}
        </VStack>
      </ScrollView>
    </>
  );
}
