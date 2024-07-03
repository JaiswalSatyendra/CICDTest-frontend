import {
  Divider,
  Box,
  Card,
  Typography,
  LinearProgress,
  alpha,
  Grid,
  Button,
  IconButton,
  styled,
  useTheme,
  linearProgressClasses,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import CountUp from "react-countup";
import Chart from "react-apexcharts";

import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";

const LinearProgressError = styled(LinearProgress)(
  ({ theme }) => `
        height: 10px;
        border-radius: ${theme.general.borderRadiusLg};

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${alpha(theme.colors.error.main, 0.1)};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background-color: ${theme.colors.error.main};
        }
    `
);

const LinearProgressSuccess = styled(LinearProgress)(
  ({ theme }) => `
        height: 10px;
        border-radius: ${theme.general.borderRadiusLg};

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${alpha(theme.colors.success.main, 0.1)};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background-color: ${theme.colors.success.main};
        }
    `
);

const LinearProgressWarning = styled(LinearProgress)(
  ({ theme }) => `
        height: 10px;
        border-radius: ${theme.general.borderRadiusLg};

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${alpha(theme.colors.warning.main, 0.1)};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background-color: ${theme.colors.warning.main};
        }
    `
);

function Block3(props) {
  const { t } = useTranslation();
  const theme = useTheme();

  const Box1Options = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [theme.colors.warning.main],
    dataLabels: {
      enabled: false,
    },
    theme: {
      mode: theme.palette.mode,
    },
    stroke: {
      show: true,
      colors: [theme.colors.warning.main],
      width: 2,
    },
    legend: {
      show: false,
    },
    fill: {
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.2,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Last Week",
      "Last Month",
      "Last Year",
      "This Year",
    ],
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };
  const Box1Data = [
    {
      name: "Campaign Executions",
      data: [230, 312, 1080, 235, 1278, 967, 456, 5678, 20310, 360, 34768],
    },
  ];

  return (
    <Card>
      <Box
        px={2}
        py={1.8}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography
            gutterBottom
            sx={{
              fontSize: `${theme.typography.pxToRem(16)}`,
            }}
            variant="h4"
          >
            {t("Campaigns Execution Report")}
          </Typography>
          <Typography variant="subtitle2">
            {t("Reports for what we execute campaigns so far")}
          </Typography>
        </Box>
        <IconButton color="primary">
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box px={5} pt={4}>
        <Typography
          component="h3"
          fontWeight="bold"
          sx={{
            mb: 4,
            fontSize: `${theme.typography.pxToRem(45)}`,
          }}
        >
           <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`
              }}
              variant="h1"
            >
           {props.dashboardData.campaign_total_targets==undefined?"N/A":props.dashboardData.campaign_total_targets}
            </Typography>
          {/* <CountUp
            start={0}
            end={props.dashboardData.campaign_total_targets==undefined?"N/A":props.dashboardData.campaign_total_targets}
            duration={4}
            separator=""
            delay={3}
            decimals={3}
            decimal=","
            prefix=""
            suffix=""
          /> */}
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={4} sm={6}>
            <Typography variant="h3">  {props.dashboardData.campaign_total_count==undefined?"N/A":props.dashboardData.campaign_total_count}</Typography>
            <LinearProgressError
              sx={{
                my: 1,
              }}
              variant="determinate"
              value={12}
            />
            <Typography variant="body2" color="text.secondary">
              {t("How Many Campaigns")}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Typography variant="h3">{props.dashboardData.campaign_retention==undefined?"N/A":props.dashboardData.campaign_retention}%</Typography>
            <LinearProgressSuccess
              sx={{
                my: 1,
              }}
              variant="determinate"
              value={46}
            />
            <Typography variant="body2" color="text.secondary">
              {t("How Many People Retained")}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <Typography variant="h3">{props.dashboardData.campaign_lost==undefined?"N/A":props.dashboardData.campaign_lost}%</Typography>
            <LinearProgressWarning
              sx={{
                my: 1,
              }}
              variant="determinate"
              value={40}
            />
            <Typography variant="body2" color="text.secondary">
              {t("How Many People Lost")}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Chart options={Box1Options} series={Box1Data} type="area" height={221} />
      <Box
        p={3}
        sx={{
          textAlign: "center",
        }}
      >
      </Box>
    </Card>
  );
}

export default Block3;