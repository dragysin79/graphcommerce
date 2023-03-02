import { styled, Typography } from '@mui/material'

export const FormHeader = styled(Typography, { name: 'FormHeader' })(({ theme }) =>
  theme.unstable_sx({
    mb: theme.responsiveTemplate`calc(${theme.spacings.xxs} * -1)`,
    marginTop: theme.spacings.xxs,
  }),
)
