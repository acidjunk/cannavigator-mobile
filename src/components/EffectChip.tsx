import React from 'react';
import { Badge, BadgeText } from '@gluestack-ui/themed';

interface EffectChipProps {
  effect: string;
  confidence?: number | null;
}

function actionForEffect(effect: string): 'success' | 'error' | 'warning' | 'info' {
  const e = effect.toLowerCase();
  if (e.includes('agonist') && !e.includes('antagonist')) return 'success';
  if (e.includes('antagonist') || e.includes('nam')) return 'error';
  if (e.includes('pam')) return 'info';
  return 'warning';
}

export function EffectChip({ effect, confidence }: EffectChipProps) {
  const label = confidence != null ? `${effect} (${Math.round(confidence * 100)}%)` : effect;

  return (
    <Badge action={actionForEffect(effect)} size="sm" borderRadius="$full" mr="$1" mb="$1">
      <BadgeText>{label}</BadgeText>
    </Badge>
  );
}
