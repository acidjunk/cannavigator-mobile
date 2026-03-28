import React, { useCallback, useRef } from 'react';
import { Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed';
import { Search, X } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search...' }: SearchBarProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (text: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onChangeText(text), 300);
    },
    [onChangeText],
  );

  return (
    <Input size="lg" variant="outline" borderRadius="$lg" bg="$white">
      <InputSlot pl="$3">
        <InputIcon as={Search} size="sm" color="$textLight400" />
      </InputSlot>
      <InputField
        placeholder={placeholder}
        defaultValue={value}
        onChangeText={handleChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <InputSlot pr="$3" onPress={() => onChangeText('')}>
          <InputIcon as={X} size="sm" color="$textLight400" />
        </InputSlot>
      )}
    </Input>
  );
}
