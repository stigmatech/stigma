import type { ReactNode } from 'react';
import ConsentManagerClient from './provider';
import { fetchInitialData } from '@c15t/nextjs';

/**
 * Consent management wrapper.
 * @see https://v2.c15t.com/docs/frameworks/nextjs/quickstart
 */
export function ConsentManager({ children, lang = 'fr' }: { children: ReactNode, lang?: string }) {
	const ssrData = fetchInitialData({ backendURL: "/api/c15t" });

	return (
		<ConsentManagerClient ssrData={ssrData} lang={lang}>
			{children}
		</ConsentManagerClient>
	);
}

export { ManageConsentButton } from './trigger';
