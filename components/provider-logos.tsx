interface Provider {
  name: string
  logo: string
  height: number
  marginBottom?: number
}

interface ProviderLogosProps {
  providers: readonly Provider[]
}

export function ProviderLogos({ providers }: ProviderLogosProps) {
  return (
    <ul className="flex items-center gap-12 justify-center lg:justify-between flex-wrap">
      {providers.map((provider) => (
        <li key={provider.name}>
          <img
            src={provider.logo}
            alt={provider.name}
            className="w-auto brightness-0"
            style={{
              height: provider.height,
              marginBottom: provider.marginBottom ?? 0,
            }}
          />
        </li>
      ))}
    </ul>
  )
}
