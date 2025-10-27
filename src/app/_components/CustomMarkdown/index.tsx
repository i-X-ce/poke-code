import { Divider, Typography } from '@mui/material'
import React from 'react'
import ReactMarkdown from 'react-markdown'

function CustomMarkdown({ children }: { children: string }) {
    return (
        <ReactMarkdown
            components={{
                h1: ({ children }) =>
                    <>
                        <Typography variant='h3' fontWeight={"500"} paddingTop={6} gutterBottom>{children}</Typography>
                        <Divider />
                    </>
                ,
                h2: ({ children }) =>
                    <>
                        <Typography variant='h4' fontWeight={"500"} paddingTop={5} gutterBottom>{children}</Typography>
                        <Divider />
                    </>
                ,
                h3: ({ children }) =>
                    <>
                        <Typography variant='h5' fontWeight={"500"} paddingTop={3} gutterBottom>{children}</Typography>
                        <Divider />
                    </>
                ,
                h4: ({ children }) =>
                    <Typography variant='h6' paddingTop={2} gutterBottom>{children}</Typography>
                ,
                h5: ({ children }) =>
                    <Typography variant='h6' fontWeight={"400"} paddingTop={1} gutterBottom>{children}</Typography>
                ,
                h6: ({ children }) =>
                    <Typography variant='h6' fontWeight={"400"} paddingTop={1} gutterBottom>{children}</Typography>
                ,
                p: ({ children }) =>
                    <Typography variant='body1' gutterBottom>{children}</Typography>
                ,
                a: ({ href, children }) =>
                    <Typography
                        component={"a"}
                        href={href}
                        color="primary"
                        sx={{ textDecoration: "underline" }}
                    >
                        {children}
                    </Typography>
                ,
                strong: ({ children }) =>
                    <Typography component={"span"} fontWeight={"bold"}>
                        {children}
                    </Typography>
                ,
                ul: ({ children }) =>
                    <Typography component={"ul"} sx={{ paddingLeft: 3, paddingTop: 1, paddingBottom: 1 }} >{children}</Typography>
                ,
                ol: ({ children }) =>
                    <Typography component={"ol"} sx={{ paddingLeft: 3, paddingTop: 1, paddingBottom: 1 }}>{children}</Typography>
                ,
                li: ({ children }) =>
                    <Typography variant='body1' component={"li"}>
                        {children}
                    </Typography>
                ,
                div: ({ children }) =>
                    <Divider sx={{ marginBottom: 1 }}>{children}</Divider>
                ,
                code: ({ children, node }) => {
                    const isInline = node?.position?.start.line === node?.position?.end.line;

                    return <Typography
                        component={"span"}
                        variant='body1'
                        // color={isInline ? 'textSecondary' : 'textPrimary'}
                        color='textSecondary'
                        border={isInline ? '1px solid var(--bc-gray)' : 'none'}
                        sx={{
                            fontFamily: "var(--font-google-sans-code)",
                            paddingX: isInline ? 1 : 0,
                            borderRadius: 1,
                        }}
                    >
                        {children}
                    </Typography>
                }
                ,
                pre: ({ children }) =>
                    <Typography
                        component={"pre"}
                        borderRadius={1}
                        sx={{
                            // backgroundColor: "var(--bc-gray)",
                            boxShadow: "inset var(--sh-regular)",
                            padding: 2,
                        }}
                    >
                        {children}
                    </Typography>
                ,
            }}
        >
            {children}
        </ReactMarkdown>
    )
}

export default CustomMarkdown