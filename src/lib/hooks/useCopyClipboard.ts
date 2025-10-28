import { useEffect, useRef, useState } from "react";

const useCopyClipboard = <T extends HTMLElement | string>(content?: T) => {
    const contentRef = useRef<T | null>(content || null); // コピー対象の要素参照
    const [copied, setCopied] = useState(false); // コピー状態を管理
    const timerId = useRef<NodeJS.Timeout | null>(null); // タイマーIDを保持

    useEffect(() => {
        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
        };
    }, []);

    const handleCopy = async () => {
        let textToCopy = "";
        if (typeof content === "string") {
            textToCopy = content;
        } else {
            if (contentRef.current instanceof HTMLElement) {
                textToCopy = contentRef.current?.innerText || "";
            }
        }
        try {
            await navigator.clipboard.writeText(textToCopy);
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
            setCopied(true);
            timerId.current = setTimeout(() => {
                setCopied(false);
            }, 2000); // 2秒後にコピー状態をリセット
        } catch (error) {
            console.error("クリップボードへのコピーに失敗しました:", error);
        }
    };

    return [contentRef, handleCopy, copied] as const;
};

export default useCopyClipboard;
