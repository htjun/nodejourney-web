export type Release = {
  version: string
  downloadUrl: string
  name: string
}

export async function getLatestRelease(): Promise<Release | null> {
  try {
    const res = await fetch('https://api.github.com/repos/htjun/nodejourney-releases/releases', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) return null

    const releases = await res.json()
    if (!releases.length) return null

    const latest = releases[0]
    const macAsset = latest.assets?.find((asset: { name: string }) => asset.name.endsWith('.dmg'))

    return {
      version: latest.tag_name,
      downloadUrl: macAsset?.browser_download_url ?? '',
      name: latest.name,
    }
  } catch {
    return null
  }
}
