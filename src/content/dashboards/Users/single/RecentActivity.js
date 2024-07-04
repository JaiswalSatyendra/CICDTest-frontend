import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function RecentActivity() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title={t('Recent Activity')} />
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <ShoppingBagTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">{t('Campaigns')}</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  fontSize: `${theme.typography.pxToRem(16)}`
                }}
              >
                {t('Total')}
              </Typography>
              <Typography variant="h2">0</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  fontSize: `${theme.typography.pxToRem(16)}`
                }}
              >
                {t('Completed')}
              </Typography>
              <Typography variant="h2">0</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <FavoriteTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">{t('Projects')}</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  fontSize: `${theme.typography.pxToRem(16)}`
                }}
              >
                {t('Total')}
              </Typography>
              <Typography variant="h2">0</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  fontSize: `${theme.typography.pxToRem(16)}`
                }}
              >
                {t('Completed')}
              </Typography>
              <Typography variant="h2">0</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <StarTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">{t('Datasets')}</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  fontSize: `${theme.typography.pxToRem(16)}`
                }}
              >
                {t('Total')}
              </Typography>
              <Typography variant="h2">0</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  fontSize: `${theme.typography.pxToRem(16)}`
                }}
              >
                {t('Completed')}
              </Typography>
              <Typography variant="h2">0</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default RecentActivity;
