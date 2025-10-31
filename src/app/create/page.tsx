import { Box, Typography } from '@mui/material'
import React from 'react'
import CreateForm from './_component/CreateForm'

interface CreatePageProps {
}

const CreatePage: React.FC<CreatePageProps> = async () => {

  return (
    <Box flex={1}>
      <Typography variant='h4' fontWeight={"500"} gutterBottom color='textPrimary'>新規作成</Typography>
      <CreateForm />
    </Box>
  )
}

export default CreatePage