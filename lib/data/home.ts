export const FEATURES = [
  {
    title: 'Visual workflows',
    description:
      'Build AI pipelines on an infinite canvas. Connect text, JSON, and image nodes to prototype ideas without code.',
  },
  {
    title: 'Privacy first',
    description:
      'Everything stays on your device. API keys are encrypted locally and never leave your machine.',
  },
  {
    title: 'Multi-provider',
    description:
      'Connect OpenAI and Replicate from one interface. Generate text, images, and use vision capabilities across providers.',
  },
  {
    title: 'Latest models',
    description:
      'Access the latest image and text models as they release. New models added via app updates.',
  },
  {
    title: 'Portable projects',
    description:
      'Export workflows as single .njp files. Share with others or back up anywhere—no cloud sync needed.',
  },
  {
    title: 'Auto-save',
    description:
      'Projects save automatically with full undo/redo history. Portable .njp files you can back up anywhere.',
  },
] as const

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

// Color themes for each carousel image [main, sub1, sub2]
export const IMAGE_THEMES = [
  { colors: ['#FBCA5E', '#F19A43', '#538ECA'] as const }, // app-01.jpg
  { colors: ['#0C0F12', '#56A473', '#4883D2'] as const }, // app-02.jpg
  { colors: ['#8A629D', '#A76A3E', '#2B306A'] as const }, // app-03.jpg
  { colors: ['#C770A9', '#C04F2B', '#CB687D'] as const }, // app-04.jpg
] as const
