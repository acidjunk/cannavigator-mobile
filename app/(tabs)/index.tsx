import React, { useState, useMemo } from 'react';
import { FlatList } from 'react-native';
import { Box, Text, Heading, Divider } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { SearchBar } from '../../src/components/SearchBar';
import { DiseaseCard } from '../../src/components/DiseaseCard';
import { LigandCard } from '../../src/components/LigandCard';
import { LoadingState } from '../../src/components/LoadingState';
import { useDiseases } from '../../src/hooks/useDiseases';
import { useLigandProfileCards } from '../../src/hooks/useLigands';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const { data: diseases, isLoading: diseasesLoading } = useDiseases(query || undefined);
  const { data: profileCards, isLoading: profilesLoading } = useLigandProfileCards();

  const filteredProfiles = useMemo(() => {
    if (!profileCards || !query) return profileCards?.slice(0, 10) ?? [];
    const q = query.toLowerCase();
    return profileCards.filter(
      (c) =>
        c.ligand_display_name.toLowerCase().includes(q) ||
        c.ligand_slug.toLowerCase().includes(q) ||
        c.dashboard_card?.headline?.toLowerCase().includes(q),
    );
  }, [profileCards, query]);

  const isLoading = diseasesLoading || profilesLoading;
  const hasQuery = query.length > 0;
  const displayDiseases = hasQuery ? diseases?.slice(0, 10) ?? [] : diseases?.slice(0, 5) ?? [];

  return (
    <Box flex={1} bg="$backgroundLight50">
      <Box p="$4">
        <Heading size="xl" color="$textDark900" mb="$1">
          Cannavigator
        </Heading>
        <Text color="$textLight500" fontSize="$sm" mb="$3">
          Search diseases or cannabis profiles
        </Text>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search diseases or profiles..." />
      </Box>

      {isLoading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={[1]}
          renderItem={() => (
            <Box px="$4" pb="$8">
              <Heading size="sm" color="$textDark700" mb="$2">
                {hasQuery ? 'Disease Results' : 'Diseases'}
              </Heading>
              {displayDiseases.length === 0 ? (
                <Text color="$textLight400" fontSize="$sm">
                  No diseases found
                </Text>
              ) : (
                displayDiseases.map((d) => (
                  <DiseaseCard
                    key={d.id}
                    disease={d}
                    onPress={() => router.push(`/diseases/${d.slug}`)}
                  />
                ))
              )}

              <Divider my="$4" />

              <Heading size="sm" color="$textDark700" mb="$2">
                {hasQuery ? 'Profile Results' : 'Cannabis Profiles'}
              </Heading>
              {filteredProfiles.length === 0 ? (
                <Text color="$textLight400" fontSize="$sm">
                  No profiles found
                </Text>
              ) : (
                filteredProfiles.slice(0, 10).map((c) => (
                  <LigandCard
                    key={c.ligand_slug}
                    card={c}
                    onPress={() => router.push(`/profiles/${c.ligand_slug}`)}
                  />
                ))
              )}
            </Box>
          )}
          keyExtractor={() => 'content'}
        />
      )}
    </Box>
  );
}
