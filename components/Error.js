import { Alert, Box } from '@chakra-ui/react'

export default function Error({ children }) {
  return (
    <Alert status="error" mb={8} width="50%" variant="left-accent">
      {children}
    </Alert>
  )
}
