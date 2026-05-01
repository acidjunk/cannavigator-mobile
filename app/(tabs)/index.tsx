import React, { useState, useMemo } from 'react';
import { FlatList, Image } from 'react-native';
import {
  Box,
  Text,
  Heading,
  Divider,
  Pressable,
  HStack,
  VStack,
  Badge,
  BadgeText,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { SearchBar } from '../../src/components/SearchBar';
import { DiseaseCard } from '../../src/components/DiseaseCard';
import { LigandCard } from '../../src/components/LigandCard';
import { LoadingState } from '../../src/components/LoadingState';
import { useDiseases, useDiseaseDetail } from '../../src/hooks/useDiseases';
import { useLigandProfileCards } from '../../src/hooks/useLigands';
import { brand, topics } from '../../src/theme/colors';

interface QuickTopic {
  label: string;
  icon: string;
  color: string;
  diseaseSlugs: string[];
  description: string;
  advice: string;
}

const QUICK_TOPICS: QuickTopic[] = [
  {
    label: 'Sleep',
    icon: '\u{1F31C}',
    color: topics.sleep,
    diseaseSlugs: ['insomnia'],
    description: 'Trouble falling or staying asleep',
    advice:
      'CBD and THC interact with CB1 and TRPV1 receptors involved in sleep regulation. CBD may reduce anxiety-related insomnia, while low-dose THC can shorten sleep onset. Myrcene and Linalool are terpenes with sedative properties.',
  },
  {
    label: 'Anxiety',
    icon: '\u{1F9D8}',
    color: topics.anxiety,
    diseaseSlugs: ['anxiety', 'ptsd'],
    description: 'Stress, worry, and anxious feelings',
    advice:
      'CBD is the most studied cannabinoid for anxiety, acting on 5-HT1a serotonin receptors. CBDA shows emerging anxiolytic potential. Linalool (lavender terpene) and Limonene may provide synergistic calming effects. THC at low doses can help but may worsen anxiety at higher doses.',
  },
  {
    label: 'Euphoria',
    icon: '\u{2728}',
    color: topics.euphoria,
    diseaseSlugs: ['depression'],
    description: 'Mood lift and positive feelings',
    advice:
      'THC activates CB1 receptors in the reward pathway, producing euphoric effects. CBG and CBC show antidepressant potential via 5-HT1a receptor modulation. Limonene (citrus terpene) is associated with mood elevation. Beta-Caryophyllene activates CB2 receptors and may reduce stress.',
  },
  {
    label: 'Relaxation',
    icon: '\u{1F343}',
    color: topics.relaxation,
    diseaseSlugs: ['pain', 'inflammation', 'fibromyalgia'],
    description: 'Physical and mental relaxation',
    advice:
      'THC and CBD work on CB1/CB2 receptors to relieve tension and pain. Myrcene is the most common cannabis terpene with muscle-relaxant and sedative properties. Beta-Caryophyllene provides anti-inflammatory effects via CB2 activation. Linalool adds anxiolytic support.',
  },
];

function QuickTopicCard({
  topic,
  isSelected,
  onPress,
}: {
  topic: QuickTopic;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      bg={isSelected ? topic.color : '$white'}
      p="$3"
      borderRadius="$xl"
      borderWidth={2}
      borderColor={isSelected ? topic.color : '$borderLight200'}
      sx={{
        ':active': { opacity: 0.85 },
        ...(isSelected
          ? {
              shadowColor: topic.color,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }
          : {
              shadowColor: '$black',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 1,
            }),
      }}
      flex={1}
      minWidth="$40"
    >
      <VStack alignItems="center" gap="$1">
        <Box
          bg={isSelected ? 'rgba(255,255,255,0.25)' : `${topic.color}15`}
          w="$10"
          h="$10"
          borderRadius="$full"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="$xl">{topic.icon}</Text>
        </Box>
        <Text fontWeight="$bold" fontSize="$sm" color={isSelected ? '$white' : '$textDark900'}>
          {topic.label}
        </Text>
        <Text
          fontSize="$2xs"
          color={isSelected ? 'rgba(255,255,255,0.8)' : '$textLight500'}
          textAlign="center"
          numberOfLines={1}
        >
          {topic.description}
        </Text>
      </VStack>
    </Pressable>
  );
}

function TopicDetailView({ topic }: { topic: QuickTopic }) {
  const router = useRouter();
  // Fetch detail for first disease slug to show ligands/targets
  const { data: diseaseDetail } = useDiseaseDetail(topic.diseaseSlugs[0]);

  return (
    <Box px="$4" pb="$6">
      <Box
        borderRadius="$lg"
        overflow="hidden"
        borderWidth={1}
        borderColor="$borderLight200"
        mb="$3"
      >
        <Box bg={topic.color} px="$4" py="$3">
          <HStack alignItems="center" gap="$2">
            <Text fontSize="$xl">{topic.icon}</Text>
            <Heading size="md" color="$white">
              {topic.label}
            </Heading>
          </HStack>
          <Text fontSize="$xs" color="rgba(255,255,255,0.8)" mt="$1">
            {topic.description}
          </Text>
        </Box>
        <Box bg="$white" px="$4" py="$3">
          <Text fontSize="$sm" color="$textDark600" lineHeight="$lg">
            {topic.advice}
          </Text>
        </Box>
      </Box>

      {/* Key compounds */}
      {diseaseDetail && diseaseDetail.ligands.length > 0 ? (
        <Box
          bg="$white"
          p="$4"
          borderRadius="$lg"
          borderWidth={1}
          borderColor="$borderLight200"
          mb="$3"
        >
          <Heading size="sm" color="$textDark700" mb="$2">
            Key Compounds
          </Heading>
          {diseaseDetail.ligands
            .sort((a, b) => b.frequency - a.frequency)
            .slice(0, 6)
            .map((dl) => (
              <Pressable
                key={dl.ligand.id}
                onPress={() => router.push(`/profiles/${dl.ligand.slug}`)}
                py="$2"
                borderBottomWidth={1}
                borderBottomColor="$borderLight100"
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <VStack>
                    <Text fontWeight="$medium" fontSize="$sm" color="$primary700">
                      {dl.ligand.display_name}
                    </Text>
                    {dl.category ? (
                      <Text fontSize="$2xs" color="$textLight500">
                        {dl.category}
                      </Text>
                    ) : null}
                  </VStack>
                  <Badge size="sm" action="info" borderRadius="$full">
                    <BadgeText fontSize="$2xs">freq: {dl.frequency}</BadgeText>
                  </Badge>
                </HStack>
              </Pressable>
            ))}
        </Box>
      ) : null}

      {/* Related conditions */}
      <Box bg="$white" p="$4" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
        <Heading size="sm" color="$textDark700" mb="$2">
          Related Conditions
        </Heading>
        {topic.diseaseSlugs.map((slug) => (
          <Pressable
            key={slug}
            onPress={() => router.push(`/diseases/${slug}`)}
            py="$2"
            borderBottomWidth={1}
            borderBottomColor="$borderLight100"
          >
            <Text fontSize="$sm" color="$primary700" fontWeight="$medium">
              {slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </Text>
            <Text fontSize="$2xs" color="$textLight500">
              Tap for full pharmacology details
            </Text>
          </Pressable>
        ))}
      </Box>
    </Box>
  );
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<QuickTopic | null>(null);
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
  const displayDiseases = hasQuery ? (diseases?.slice(0, 10) ?? []) : (diseases?.slice(0, 5) ?? []);

  const handleTopicPress = (topic: QuickTopic) => {
    if (selectedTopic?.label === topic.label) {
      setSelectedTopic(null);
    } else {
      setSelectedTopic(topic);
      setQuery('');
    }
  };

  return (
    <Box flex={1} bg="$backgroundLight50">
      <Box p="$4" pb="$2">
        <VStack mb="$2" alignItems="flex-start">
          <Image
            source={require('../../assets/logo-landscape.png')}
            style={{ width: 220, height: 47, marginBottom: 4 }}
            resizeMode="contain"
          />
          <Text color={brand.textMuted} fontSize="$xs">
            Cannabis pharmacology navigator
          </Text>
        </VStack>
        <SearchBar
          value={query}
          onChangeText={(t) => {
            setQuery(t);
            if (t.length > 0) setSelectedTopic(null);
          }}
          placeholder="Search diseases or profiles..."
        />
      </Box>

      {isLoading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={[1]}
          renderItem={() => (
            <Box>
              {/* Quick Topics */}
              {!hasQuery ? (
                <Box px="$4" mb="$3">
                  <Heading size="sm" color="$textDark700" mb="$2">
                    Quick Lookup
                  </Heading>
                  <HStack gap="$2" flexWrap="wrap">
                    {QUICK_TOPICS.map((topic) => (
                      <QuickTopicCard
                        key={topic.label}
                        topic={topic}
                        isSelected={selectedTopic?.label === topic.label}
                        onPress={() => handleTopicPress(topic)}
                      />
                    ))}
                  </HStack>
                </Box>
              ) : null}

              {/* Selected topic detail */}
              {selectedTopic && !hasQuery ? <TopicDetailView topic={selectedTopic} /> : null}

              {/* Search results or default lists */}
              {!selectedTopic || hasQuery ? (
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
                    filteredProfiles
                      .slice(0, 10)
                      .map((c) => (
                        <LigandCard
                          key={c.ligand_slug}
                          card={c}
                          onPress={() => router.push(`/profiles/${c.ligand_slug}`)}
                        />
                      ))
                  )}
                </Box>
              ) : null}
            </Box>
          )}
          keyExtractor={() => 'content'}
        />
      )}
    </Box>
  );
}
