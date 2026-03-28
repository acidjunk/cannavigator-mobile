// Pre-define globals that Expo SDK 55 canary tries to lazy-load via dynamic import
// This prevents the "import outside of test code" error
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
}

// Expo SDK 55 canary defines __ExpoImportMetaRegistry lazily which triggers dynamic imports in test
(globalThis as any).__ExpoImportMetaRegistry = new Map();

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock expo modules that cause issues in test env
jest.mock('expo-linking', () => ({ createURL: jest.fn() }));
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
  useLocalSearchParams: () => ({}),
  Stack: { Screen: () => null },
  Tabs: { Screen: () => null },
  Link: () => null,
}));
