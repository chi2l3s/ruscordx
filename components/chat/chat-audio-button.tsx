'use client';

import qs from 'query-string';
import { ActionTooltip } from '../action-tooltip';
import { PhoneCall, PhoneOff } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const ChatAudioButton = () => {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isVideo = searchParams?.get('audio');

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathName || '',
            query: {
                video: isVideo ? undefined : true
            }
        }, { skipNull: true });

        router.push(url);
    }

    const Icon = isVideo ? PhoneOff : PhoneCall;
    const tooltipLabel = isVideo ? 'Закончить звонок' : 'Начать звонок';

    return (
        <ActionTooltip side='bottom' label={tooltipLabel}>
            <button onClick={onClick} className='hover:opacity-75 transition mr-4'>
                <Icon className='h-6 w-6 text-zinc-500 dark:text-zinc-400'/>
            </button>
        </ActionTooltip>
    )
}