export type BranchType = 'feature' | 'bugfix' | 'hotfix' | 'release' | 'support';

export interface BranchTypeInfo {
  type: BranchType;
  label: string;
  description: string;
  icon: string;
  color: string;
  examples: string[];
}

export const BRANCH_TYPES: BranchTypeInfo[] = [
  {
    type: 'feature',
    label: 'Feature',
    description: 'New features and enhancements',
    icon: '✨',
    color: '#10b981',
    examples: ['user-authentication', 'payment-integration', 'dark-mode'],
  },
  {
    type: 'bugfix',
    label: 'Bugfix',
    description: 'Bug fixes during development',
    icon: '🐛',
    color: '#f59e0b',
    examples: ['login-error', 'memory-leak', 'broken-links'],
  },
  {
    type: 'hotfix',
    label: 'Hotfix',
    description: 'Critical production fixes',
    icon: '🔥',
    color: '#ef4444',
    examples: ['security-patch', 'api-timeout', 'data-corruption'],
  },
  {
    type: 'release',
    label: 'Release',
    description: 'Release preparation branches',
    icon: '🚀',
    color: '#8b5cf6',
    examples: ['v1.2.0', 'v2024.01', 'spring-release'],
  },
  {
    type: 'support',
    label: 'Support',
    description: 'Maintenance and legacy support',
    icon: '🛠️',
    color: '#06b6d4',
    examples: ['legacy-v1', 'ios-12', 'old-api'],
  },
];
