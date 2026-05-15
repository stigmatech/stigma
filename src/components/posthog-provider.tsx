'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useConsentManager } from '@c15t/react'
import { useEffect, useState } from 'react'

export function PostHogContextProvider({ children }: { children: React.ReactNode }) {
	const { has } = useConsentManager()
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		// Only initialize if we have explicit consent for measurement (analytics) category
		if (typeof window !== 'undefined' && has('measurement') && !isInitialized) {
			posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
				api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
				person_profiles: 'identified_only',
				capture_pageview: false, // We'll handle this manually if needed, or let PostHog handle it
				capture_exceptions: true,
			})
			setIsInitialized(true)
		}
	}, [has, isInitialized])

	return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
