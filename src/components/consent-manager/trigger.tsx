'use client';

import { useConsentDialogTrigger } from '@c15t/nextjs';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ManageConsentButtonProps {
	children?: ReactNode;
	className?: string;
}

export function ManageConsentButton({ children, className }: ManageConsentButtonProps) {
	const { openDialog } = useConsentDialogTrigger();

	return (
		<button
			onClick={openDialog}
			className={cn(
				"inline-flex items-center gap-2 text-sm font-bold transition-all hover:opacity-80 active:scale-95",
				className
			)}
		>
			{children || (
				<>
					<span className="material-symbols-outlined text-[18px]">settings</span>
					<span>Gérer mes préférences cookies</span>
				</>
			)}
		</button>
	);
}
