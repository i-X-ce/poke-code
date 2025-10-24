import React from 'react'
import ReactMarkdown from 'react-markdown'

function CustomMarkdown({ children }: { children: string }) {
    return (
        <ReactMarkdown>
            {children}
        </ReactMarkdown>
    )
}

export default CustomMarkdown