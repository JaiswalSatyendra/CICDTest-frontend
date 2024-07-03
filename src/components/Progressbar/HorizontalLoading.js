import {
  Grid,
  Card,
  Typography,
  Box,
  alpha,
  LinearProgress,
  styled,
  useTheme,
  linearProgressClasses,
} from "@mui/material";

import { useTranslation } from "react-i18next";
const LinearProgressError = styled(LinearProgress)(
  ({ theme }) => `
        height: 8px;
        border-radius: ${theme.general.borderRadiusLg};

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${theme.colors.alpha.trueWhite[30]};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background-color: ${theme.colors.primary.main};
        }
    `
);

function HorizontalLoading() {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Card
      sx={{
        pt: 2.5,
        pb: 2,
        px: 2.5,
        flexGrow: 1,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        flex={1}
        mb={1}
        sx={{
          width: "100%",
        }}
      >
        <Typography
          sx={{
            color: `${theme.colors.primary.main}`,
            pr: 1.5,
          }}
          variant="h3"
        >
          Uploading
        </Typography>
        <Box flex={1}>
          <LinearProgressError value={32} />
        </Box>
      </Box>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{
          color: `${theme.colors.success.main}`,
        }}
        noWrap
      >
        {t("In progress")}
      </Typography>
    </Card>
  );
}

export default HorizontalLoading;
