import { Fragment } from "react";

import {
  Box,
  ListItemAvatar,
  ListItemText,
  Divider,
  List,
  ListItem,
  Card,
  Typography,
  IconButton,
  Button,
  Avatar,
  styled,
  useTheme,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import Chart from "react-apexcharts";

import Scrollbar from "../../../components/Scrollbar";
import Text from "../../../components/Text";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import { useNavigate } from "react-router";

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(1.5)};
    top: ${theme.spacing(1.5)};
    z-index: 7;
  `
);

const ListWrapper = styled(List)(
  () => `
    .MuiDivider-root:first-of-type {
        display: none;
    }
  `
);

function Block8(props) {
  const { t } = useTranslation();
  const theme = useTheme();

  const items = [
    {
      id: 1,
      username: "Shanelle Wynn",
      jobtitle: "Campaign Executor, Apple Inc.",
      avatar: "../../../images/avatars/1.jpg",
    },
    {
      id: 2,
      username: "Akeem Griffith",
      jobtitle: "Marketing Manager, Google Inc.",
      avatar: "../../../images/avatars/2.jpg",
    },
    {
      id: 3,
      username: "Abigayle Hicks",
      jobtitle: "Data Scientist, Spotify",
      avatar: "../../../images/avatars/3.jpg",
    },
    {
      id: 4,
      username: "Reece Corbett",
      jobtitle: "Senior Director, Amazon Inc.",
      avatar: "../../../images/avatars/4.jpg",
    },
    {
      id: 5,
      username: "Zain Baptista",
      jobtitle: "Senior Manager, Microsoft",
      avatar: "../../../images/avatars/5.jpg",
    },
  ];

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
    colors: [theme.colors.info.main],
    dataLabels: {
      enabled: false,
    },
    theme: {
      mode: theme.palette.mode,
    },
    stroke: {
      show: true,
      colors: [theme.colors.info.main],
      width: 2,
    },
    legend: {
      show: false,
    },
    fill: {
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.3,
        inverseColors: false,
        opacityFrom: 0.8,
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
      crosshairs: {
        width: 1,
      },
    },
    yaxis: {
      show: false,
      min: 0,
    },
  };
  const Box1Data = [
    {
      name: "Weekly ML Model Executions",
      data: [32, 52, 45, 32, 54, 56, 28, 25, 36, 62],
    },
  ];

 

   let navigate = useNavigate();
   

  return (
    <Card
      sx={{
        position: "relative",
      }}
    >
      <CardActions>
        <IconButton size="small" color="primary">
          <MoreVertTwoToneIcon />
        </IconButton>
      </CardActions>
      <Box p={3}>
        <Typography
          variant="h3"
          sx={{
            fontSize: `${theme.typography.pxToRem(19)}`,
          }}
        >
          {t("Survey projects and view those Projects")}
        </Typography>
        <Typography variant="subtitle2">
          {t("Reports for what we executed this week")}.
        </Typography>
      </Box>
      <Chart options={Box1Options} series={Box1Data} type="area" height={119} />
      <Box
        sx={{
          height: 237,
        }}
      >
        <Scrollbar>

          
          <ListWrapper disablePadding>
            {props.surveyProjectList !== undefined && props.surveyProjectList.map((item) => (
              <Fragment key={item.id}>
                <Divider />
                <ListItem
                  sx={{
                    py: 2,
                    px: 2.5,
                  }}
                >
                  {/* <ListItemAvatar
                    sx={{
                      mr: 0,
                    }}
                  >
                    <Avatar alt={item.username} src={item.avatar} />
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={<Text color="black">{item.projectid}</Text>}
                    primaryTypographyProps={{
                      variant: "h5",
                      noWrap: true,
                    }}
                    secondary={item.templateName}
                    secondaryTypographyProps={{
                      variant: "subtitle2",
                      noWrap: true,
                    }}
                  />
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => {
                      navigate("/dashboard/data-platform/visualize-data-survey", { state: item });
                    }}
                    sx={{
                      backgroundColor: `${theme.colors.secondary.lighter}`,
                      "&:hover": {
                        backgroundColor: `${theme.colors.secondary.main}`,
                        color: `${theme.palette.getContrastText(
                          theme.colors.secondary.main
                        )}`,
                      },
                    }}
                  >
                    {t("View")}
                  </Button>
                </ListItem>
              </Fragment>
            ))}
          </ListWrapper>
        </Scrollbar>
      </Box>
      <Divider />
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

export default Block8;
