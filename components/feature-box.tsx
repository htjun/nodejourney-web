import type { FeatureId } from '@/lib/data/home'
import { FeatureVisual } from './feature-visuals'

type FeatureBoxProps = {
  id: FeatureId
  title: string
  description: string
}

export function FeatureBox({ id, title, description }: FeatureBoxProps) {
  return (
    <div className="flex flex-col gap-6 bg-gray-500/2 border border-gray-200/80 p-4 rounded-xs justify-between">
      <div className="flex flex-col gap-6">
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
      <FeatureVisual id={id} />
    </div>
  )
}
