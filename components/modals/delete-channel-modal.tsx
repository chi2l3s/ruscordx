'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

export const DeleteChannelModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === 'deleteChannel';
    const { server, channel } = data;

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            })

            await axios.delete(url);

            onClose();
            router.refresh();
            router.push(`/servers/${server?.id}`);
        } catch(e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white p-0 text-black overflow-hidden'>
                <DialogHeader  className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold text-rose-500'>
                        Удалить канал
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Вы действительно хотите это сделать? <br />
                        Канал <span className='font-semibold text-indigo-500'>#{channel?.name}</span> будет удалён навсегда
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='bg-gray-100 px-6 py-4'>
                    <div className='flex items-center justify-between w-full'>
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant='ghost'
                        >
                            Отменить
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={onClick}
                            variant='primary'
                            className='bg-rose-500 hover:bg-rose-700'
                        >
                            Удалить
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}