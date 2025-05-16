'use client';
import { useEffect, useState } from 'react';

interface NotificationProps {
    children: React.ReactNode;
    timeout?: number;
}

export const Notification = ({
    children,
    timeout = 3000
}: NotificationProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, timeout);

        return () => clearTimeout(timer);
    }, [timeout]);

    if (!visible) return null;

    return (
        <div className="inline-block ml-2 py-1 px-2 bg-red-600 text-white rounded-md text-xs animate-fade-in">
            {children}
        </div>
    );
};