import React, { useEffect, useState } from 'react';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
            setCurrentTime(now);
        };

        const intervalId = setInterval(updateTime, 1000);
        updateTime(); // İlk güncelleme

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h2>{currentTime}</h2>
        </div>
    );
};

export default Clock;
