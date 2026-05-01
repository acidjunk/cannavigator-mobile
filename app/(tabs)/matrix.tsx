import React, { useState, useMemo } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Box, Text, Badge, BadgeText, HStack } from '@gluestack-ui/themed';
import { SearchBar } from '../../src/components/SearchBar';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';
import { useInteractionMatrix } from '../../src/hooks/useInteractions';
import { InteractionMatrixCell } from '../../src/types/interaction';
import { colors } from '../../src/theme/colors';

const CELL_WIDTH = 56;
const CELL_HEIGHT = 44;
const HEADER_HEIGHT = 100;
const ROW_HEADER_WIDTH = 120;

function effectAbbrev(effect: string): string {
  const e = effect.toLowerCase();
  if (e.includes('partial') && e.includes('agonist')) return 'PAg';
  if (e.includes('agonist') && !e.includes('antagonist')) return 'Ag';
  if (e.includes('antagonist')) return 'Ant';
  if (e === 'pam') return 'PAM';
  if (e === 'nam') return 'NAM';
  if (e.includes('inhibit')) return 'Inh';
  return effect.slice(0, 3);
}

function effectColor(effect: string): string {
  const e = effect.toLowerCase();
  if (e.includes('agonist') && !e.includes('antagonist') && !e.includes('partial'))
    return '#22c55e';
  if (e.includes('partial')) return '#86efac';
  if (e.includes('antagonist') || e === 'nam') return '#ef4444';
  if (e === 'pam') return '#3b82f6';
  if (e.includes('inhibit')) return '#f97316';
  return '#9ca3af';
}

function CellContent({ cells }: { cells: InteractionMatrixCell[] }) {
  return (
    <View style={styles.cell}>
      {cells.map((c, i) => (
        <View
          key={i}
          style={[
            styles.effectDot,
            {
              backgroundColor: effectColor(c.effect),
              borderWidth: c.potency_nm ? 1.5 : 0,
              borderColor: '#166534',
            },
          ]}
        >
          <Text style={styles.effectText}>{effectAbbrev(c.effect)}</Text>
        </View>
      ))}
    </View>
  );
}

export default function MatrixScreen() {
  const [query, setQuery] = useState('');
  const { data: matrix, isLoading, isError, refetch } = useInteractionMatrix();

  const filtered = useMemo(() => {
    if (!matrix) return [];
    if (!query) return matrix;
    const q = query.toLowerCase();
    return matrix.filter(
      (r) =>
        r.target_display_name.toLowerCase().includes(q) || r.target_slug.toLowerCase().includes(q),
    );
  }, [matrix, query]);

  // Collect all unique ligand slugs across the matrix
  const ligandSlugs = useMemo(() => {
    if (!matrix) return [];
    const set = new Set<string>();
    for (const row of matrix) {
      for (const slug of Object.keys(row.ligands)) {
        set.add(slug);
      }
    }
    return Array.from(set).sort();
  }, [matrix]);

  if (isLoading) return <LoadingState message="Loading interaction matrix..." />;
  if (isError) return <ErrorState message="Failed to load matrix" onRetry={refetch} />;

  return (
    <Box flex={1} bg="$backgroundLight50">
      <Box p="$3" pb="$1">
        <SearchBar value={query} onChangeText={setQuery} placeholder="Filter by target..." />
        <Text fontSize="$xs" color="$textLight400" mt="$1">
          {filtered.length} targets x {ligandSlugs.length} ligands
        </Text>
      </Box>

      {/* Legend */}
      <HStack px="$3" py="$1" gap="$2" flexWrap="wrap">
        {[
          { label: 'Ag', color: '#22c55e' },
          { label: 'PAg', color: '#86efac' },
          { label: 'Ant', color: '#ef4444' },
          { label: 'PAM', color: '#3b82f6' },
          { label: 'NAM', color: '#ef4444' },
          { label: 'Inh', color: '#f97316' },
        ].map((l) => (
          <HStack key={l.label} alignItems="center" gap="$1" mr="$2">
            <View style={[styles.legendDot, { backgroundColor: l.color }]} />
            <Text fontSize="$2xs" color="$textLight500">
              {l.label}
            </Text>
          </HStack>
        ))}
        <HStack alignItems="center" gap="$1">
          <View
            style={[
              styles.legendDot,
              { backgroundColor: '#22c55e', borderWidth: 1.5, borderColor: '#166534' },
            ]}
          />
          <Text fontSize="$2xs" color="$textLight500">
            = has potency
          </Text>
        </HStack>
      </HStack>

      {/* Matrix */}
      <ScrollView style={{ flex: 1 }} bounces={false}>
        <ScrollView horizontal bounces={false}>
          <View>
            {/* Column headers (ligands) */}
            <View style={styles.headerRow}>
              <View style={styles.cornerCell} />
              {ligandSlugs.map((slug) => (
                <View key={slug} style={styles.colHeader}>
                  <Text style={styles.colHeaderText} numberOfLines={1}>
                    {slug.replace(/_/g, ' ')}
                  </Text>
                </View>
              ))}
            </View>

            {/* Data rows */}
            {filtered.map((row) => (
              <View key={row.target_slug} style={styles.dataRow}>
                <View style={styles.rowHeader}>
                  <Text style={styles.rowHeaderText} numberOfLines={2}>
                    {row.target_display_name}
                  </Text>
                </View>
                {ligandSlugs.map((slug) => {
                  const cells = row.ligands[slug];
                  return (
                    <View key={slug} style={styles.cell}>
                      {cells ? <CellContent cells={cells} /> : null}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: colors.cream,
  },
  cornerCell: {
    width: ROW_HEADER_WIDTH,
    height: HEADER_HEIGHT,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  colHeader: {
    width: CELL_WIDTH,
    height: HEADER_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 4,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#e5e7eb',
  },
  colHeaderText: {
    fontSize: 8,
    color: '#374151',
    transform: [{ rotate: '-90deg' }],
    width: HEADER_HEIGHT - 8,
    textAlign: 'left',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  rowHeader: {
    width: ROW_HEADER_WIDTH,
    height: CELL_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 4,
    backgroundColor: colors.cream,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  rowHeaderText: {
    fontSize: 9,
    color: '#374151',
    fontWeight: '500',
  },
  cell: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 2,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#f3f4f6',
  },
  effectDot: {
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 1,
    minWidth: 22,
    alignItems: 'center',
  },
  effectText: {
    fontSize: 7,
    color: '#ffffff',
    fontWeight: '700',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
});
