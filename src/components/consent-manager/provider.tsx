'use client';
import type { ReactNode } from 'react';
import type { SSRInitialData } from 'c15t';
import {
	ConsentDialog,
	ConsentManagerProvider,
	ConsentBanner,
} from '@c15t/nextjs';
import { policyPackPresets } from 'c15t';
/**
 * Client-side consent manager provider.
 * @see https://v2.c15t.com/docs/frameworks/nextjs/quickstart
 */
export default function ConsentManagerClient({ children, ssrData, lang = 'fr' }: { children: ReactNode, ssrData?: Promise<SSRInitialData | undefined>, lang?: string }) {
	return (
		<ConsentManagerProvider options={{
			ssrData,
			mode: 'offline',
			offlinePolicy: {
				policyPacks: [
					policyPackPresets.europeOptIn(), // GDPR opt-in banner
					policyPackPresets.quebecOptIn(), // Law 25 (Quebec) opt-in banner
					policyPackPresets.californiaOptOut(), // CCPA opt-out banner
					policyPackPresets.worldNoBanner(), // No banner elsewhere
				]
			},
			colorScheme: 'dark',
			i18n: {
				locale: lang,
				detectBrowserLanguage: false,
				messages: {
					fr: {
						common: {
							acceptAll: 'Tout accepter',
							rejectAll: 'Tout refuser',
							customize: 'Personnaliser',
							save: 'Enregistrer',
						},
						cookieBanner: {
							title: 'Respect de votre vie privée',
							description: 'Nous utilisons des cookies pour optimiser votre expérience et analyser notre trafic.',
						},
					},
					en: {
						common: {
							acceptAll: 'Accept All',
							rejectAll: 'Reject All',
							customize: 'Customize',
							save: 'Save',
						},
						cookieBanner: {
							title: 'We value your privacy',
							description: 'We use cookies to enhance your experience and analyze our traffic.',
						},
					}
				}
			},
			// Add your scripts here:
				// import { googleTagManager } from '@c15t/scripts/google-tag-manager';
				// scripts: [
				//   googleTagManager({ id: 'GTM-XXXXXX' }),
				// ],
		}}>
			<ConsentBanner hideBranding />
			<ConsentDialog hideBranding />
			{children}
		</ConsentManagerProvider>
	);
}
