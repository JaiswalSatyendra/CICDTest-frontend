import { useRef, useState } from "react";
import {
  Typography,
  Button,
  Box,
  alpha,
  lighten,
  Avatar,
  MenuItem,
  Menu,
  styled,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import DocumentScannerTwoToneIcon from "@mui/icons-material/DocumentScannerTwoTone";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import AddAlertTwoToneIcon from "@mui/icons-material/AddAlertTwoTone";

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === "dark"
          ? theme.colors.alpha.trueWhite[10]
          : theme.colors.alpha.white[50]
      };
      box-shadow: ${
        theme.palette.mode === "dark"
          ? `0 1px 0 ${alpha(
              lighten(theme.colors.primary.main, 0.8),
              0.2
            )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)`
          : `0px 2px 4px -3px ${alpha(
              theme.colors.alpha.black[100],
              0.4
            )}, 0px 5px 16px -4px ${alpha(theme.colors.alpha.black[100], 0.2)}`
      };
`
);

function PageHeader(props) {
  const { t } = useTranslation();

  const periods = [
    {
      value: "today",
      text: t("Today"),
    },
    {
      value: "yesterday",
      text: t("Yesterday"),
    },
    {
      value: "last_month",
      text: t("Last month"),
    },
    {
      value: "last_year",
      text: t("Last year"),
    },
  ];

  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const [period, setPeriod] = useState(periods[3].text);
  const actionRef1 = useRef(null);

  return (
    <Box
      display="flex"
      alignItems={{ xs: "stretch", md: "center" }}
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <AvatarPageTitle variant="rounded">
          <AddAlertTwoToneIcon fontSize="large" />
        </AvatarPageTitle>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Business Dashboard")}
          </Typography>
        </Box>
          {
              (props.dashboardData.status!==undefined&&props.dashboardData.status==="running") &&
              (
              <Tooltip sx={{float:"right"}} title={t("Inprogress")} arrow>
                <IconButton
                  color="primary"
                >
                  <CircularProgress fontSize="large" />
                </IconButton>
              </Tooltip>
             ) } 
      </Box>
    </Box>
  );
}

export default PageHeader;
