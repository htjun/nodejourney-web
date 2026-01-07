import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Privacy - Nodejourney',
  description: 'Terms of Service and Privacy Policy for Nodejourney',
}

const TERMS = [
  {
    title: 'Disclaimer of Warranties',
    content:
      'The software is provided "as is" without warranty of any kind. The entire risk as to the quality and performance of the software is with you.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'In no event shall the author be liable for any damages arising from the use of this software.',
  },
  {
    title: 'API Keys',
    content:
      "You are solely responsible for your API keys, their costs, and compliance with each provider's terms. Your keys are stored locally and never transmitted to us.",
  },
  {
    title: 'Indemnification',
    content:
      'You agree to indemnify and hold harmless the author from any claims arising from your use of the software.',
  },
  {
    title: 'Privacy',
    content:
      'The app collects no data. This website uses Vercel Analytics for anonymous page views.',
  },
  {
    title: 'Governing Law',
    content: 'These terms are governed by the laws of Victoria, Australia.',
  },
]

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto items-stretch px-4">
      <Header />
      <main className="py-16 max-w-3xl">
        <h1 className="text-2xl font-medium mb-12">Terms & Privacy</h1>
        <div className="prose prose-gray prose-sm space-y-12 text-gray-600">
          {TERMS.map((term) => (
            <section key={term.title} className="space-y-3">
              <h2 className="text-lg font-medium">{term.title}</h2>
              <p>{term.content}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
