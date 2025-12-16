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
  { name: 'Google Gemini', logo: '/images/gemini.svg', height: 46, marginBottom: 18 },
  { name: 'Fal', logo: '/images/fal.svg', height: 32, marginBottom: 8 },
] as const
