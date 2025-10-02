import path from 'path'
import fs from 'fs/promises'
import React from 'react'
import { Stack } from '@mui/material'

interface CodePageProps {
  params: { id: string }
}

interface CodeType {
  title: string
  date: string
  content: string
}

const CodePage: React.FC<CodePageProps> = async ({ params }) => {
  const { id } = params
  const codeData = await getCodeData(id)

  if (!codeData) {
    return <div>Code not found</div>
  }

  return (
    <div>
      <Stack>
        <h1>{codeData.title}</h1>
        <p>{codeData.date}</p>
        <div>{codeData.content}</div>
      </Stack>
    </div>
  )
}


export async function generateStaticParams() {
  const codesDirectory = path.join(process.cwd(), 'src/data/codes')
  const filenames = await fs.readdir(codesDirectory);

  const ids = filenames.map((filename) => ({ id: filename.replace(/\.json$/, '') }))
  return ids;
}

export async function getCodeData(id: string) {
  const filePath = path.join(process.cwd(), 'src/data/codes', `${id}.json`);
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data as CodeType;
  } catch (error) {
    return null;
  }
}

export default CodePage