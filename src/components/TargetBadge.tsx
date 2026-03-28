import React from 'react';
import { Badge, BadgeText } from '@gluestack-ui/themed';

interface TargetBadgeProps {
  name: string;
  type?: string;
}

function actionForType(type?: string): 'info' | 'success' | 'warning' | 'error' {
  switch (type?.toLowerCase()) {
    case 'receptor':
      return 'info';
    case 'enzyme':
      return 'success';
    case 'ion channel':
      return 'warning';
    default:
      return 'info';
  }
}

export function TargetBadge({ name, type }: TargetBadgeProps) {
  return (
    <Badge action={actionForType(type)} size="sm" borderRadius="$full" mr="$1" mb="$1">
      <BadgeText>{name}</BadgeText>
    </Badge>
  );
}
