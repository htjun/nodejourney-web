export const FEATURES = [
  {
    id: 'visual-workflows',
    title: 'Visual workflows',
    description:
      'Build AI pipelines on an infinite canvas. Connect text, JSON, and image nodes to prototype ideas without code.',
  },
  {
    id: 'privacy-first',
    title: 'Privacy first',
    description:
      'Everything stays on your device. API keys are encrypted locally and never leave your machine.',
  },
  {
    id: 'multi-provider',
    title: 'Multi-provider',
    description:
      'Connect OpenAI and Replicate from one interface. Generate text, images, and use vision capabilities across providers.',
  },
  {
    id: 'latest-models',
    title: 'Latest models',
    description:
      'Access the latest image and text models as they release. New models added via app updates.',
  },
  {
    id: 'portable-projects',
    title: 'Portable projects',
    description:
      'Export workflows as single .njp files. Share with others or back up anywhere—no cloud sync needed.',
  },
  {
    id: 'auto-save',
    title: 'Auto-save',
    description:
      'Projects save automatically with full undo/redo history. Portable .njp files you can back up anywhere.',
  },
] as const

export type FeatureId = (typeof FEATURES)[number]['id']

export const PROVIDERS = [
  { name: 'OpenAI', logo: '/images/openai.svg', height: 40 },
  { name: 'Replicate', logo: '/images/replicate.svg', height: 36 },
  { name: 'Anthropic', logo: '/images/anthropic.svg', height: 26 },
  {
    name: 'Google Gemini',
    logo: '/images/gemini.svg',
    height: 46,
    marginBottom: 18,
  },
  { name: 'Fal', logo: '/images/fal.svg', height: 32, marginBottom: 8 },
] as const

// Color themes for each carousel image [main, sub1, sub2] + bgColor
export const IMAGE_THEMES = [
  { colors: ['#39458C', '#DA553F', '#304B34'] as const, bgColor: '#F6F6F6' }, // app-05.jpg
  { colors: ['#FBCA5E', '#F19A43', '#538ECA'] as const, bgColor: '#F7F6F2' }, // app-01.jpg
  { colors: ['#0C0F12', '#56A473', '#4883D2'] as const, bgColor: '#F6F9F8' }, // app-02.jpg
  { colors: ['#8A629D', '#A76A3E', '#2B306A'] as const, bgColor: '#F8F5FA' }, // app-03.jpg
  { colors: ['#C770A9', '#C04F2B', '#CB687D'] as const, bgColor: '#FAF4F9' }, // app-04.jpg
] as const
