import type { FeatureId } from '@/lib/data/home'
import { AutoSave } from './auto-save'
import { LatestModels } from './latest-models'
import { MultiProvider } from './multi-provider'
import { PortableProjects } from './portable-projects'
import { PrivacyFirst } from './privacy-first'
import { VisualWorkflows } from './visual-workflows'

const FEATURE_VISUALS: Record<FeatureId, React.ComponentType> = {
  'visual-workflows': VisualWorkflows,
  'privacy-first': PrivacyFirst,
  'multi-provider': MultiProvider,
  'latest-models': LatestModels,
  'portable-projects': PortableProjects,
  'auto-save': AutoSave,
}

export function FeatureVisual({ id }: { id: FeatureId }) {
  const Visual = FEATURE_VISUALS[id]
  return <Visual />
}
