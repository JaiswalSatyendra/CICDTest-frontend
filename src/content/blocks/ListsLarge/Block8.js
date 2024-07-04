import { Fragment } from "react";

import {
  Box,
  ListItemAvatar,
  ListItemText,
  Divider,
  List,
  Item,
  Card,
  alpha,
  Button,
  LinearProgress,
  Typography,
  Link,
  Avatar,
  styled,
  ListItem,
  useTheme,
  linearProgressClasses,
} from "@mui/material";

import Grid from '@mui/material/Grid';

import { useTranslation } from "react-i18next";

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.secondary.main};
    color: ${theme.palette.getContrastText(theme.colors.secondary.main)};
    font-size: ${theme.typography.pxToRem(11)};
    font-weight: bold;
    text-transform: uppercase;
    border-radius: ${theme.general.borderRadius};
    padding: ${theme.spacing(0.5, 1.5, 0.3)};
  `
);

const LinearProgressPrimary = styled(LinearProgress)(
  ({ theme }) => `
        height: 8px;
        border-radius: ${theme.general.borderRadiusLg};

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${alpha(theme.colors.primary.main, 0.1)};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background-color: ${theme.colors.primary.main};
        }
    `
);

function Block8(props) {
  const { t } = useTranslation();
  const theme = useTheme();

  // const items = 
  
  // [
  //   {
  //     id: 1,
  //     name: "Munroe Dacks",
  //     jobtitle: "Senior Marketing Manager",
  //     company: "Clapingo",
  //     avatar: "../../../images/avatars/1.jpg",
  //     value: 65,
  //   },
  //   {
  //     id: 2,
  //     name: "Gunilla Canario",
  //     jobtitle: "Associate Engineer",
  //     company: "Kalagato",
  //     avatar: "../../../images/avatars/2.jpg",
  //     value: 76,
  //   },
  //   {
  //     id: 3,
  //     name: "Rowena Geistmann",
  //     jobtitle: "Data Scientist",
  //     company: "Royal Enfield",
  //     avatar: "../../../images/avatars/3.jpg",
  //     value: 54,
  //   },
  //   {
  //     id: 4,
  //     name: "Ede Stoving",
  //     jobtitle: "VP Product Management",
  //     company: "BMW",
  //     avatar: "../../../images/avatars/4.jpg",
  //     value: 23,
  //   },
  //   {
  //     id: 5,
  //     name: "Crissy Spere",
  //     jobtitle: "Customer Success Manager",
  //     company: "Digitas",
  //     avatar: "../../../images/avatars/5.jpg",
  //     value: 16,
  //   },
  // ];

  return (
    <Card>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          background: `${theme.colors.alpha.black[5]}`,
        }}
        p={2}
      >
        <Box>
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{
              fontSize: `${theme.typography.pxToRem(12)}`,
            }}
          >
            {t("Progress")}
          </Typography>
          <Typography variant="h4">{t("Users Analytics")}</Typography>
        </Box>
      </Box>

      <List disablePadding>
        <Divider />
        <ListItem>
          <ListItemText sx={{ width: "20%" }}>
            Customer
          </ListItemText>
          <ListItemText sx={{ width: "20%" }}>
            Cltv
          </ListItemText>
          <ListItemText sx={{ width: "20%" }}>
          Brand engagement score
          </ListItemText>
          <ListItemText sx={{ width: "40%" }}>
            Churn %
          </ListItemText>
        </ListItem>
        <Divider />
        <Box
        sx={{
          height: 325,
          overflow:"auto",
          
        }}
      >
        {/* <Scrollbar> */}
          
        {props.dashboardData.user_analytics!==undefined && JSON.parse(props.dashboardData.user_analytics).map((item,ind) => (
          <Fragment key={"user_analytics"+ind}>
            <ListItem>
              <ListItemText sx={{
                width: "20%",
              }}>
                {/* <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                  }}
                  alt={item.name}
                  src={item.avatar}
                /> */}
                {parseInt(item.customer)}
              </ListItemText>
              <ListItemText sx={{
                width: "20%",
              }} >
                {item.cltv}
              </ListItemText>
              <ListItemText sx={{
                width: "20%",
              }}>
                {item.brand_engagement_score}
              </ListItemText>
              <ListItemText sx={{
                width: "40%",
              }}>
                <Box
                  display="flex"
                  alignItems="center"
                  flex={1}
                  sx={{
                    width: "100%",
                    pr: 3,
                  }}
                >
                  <LinearProgressPrimary
                    sx={{
                      minWidth: 150,
                      width: "100%",
                    }}
                    variant="determinate"
                    value={item.churn_rate}
                  />

                  <Typography
                    sx={{
                      pl: 1,
                    }}
                    fontWeight="bold"
                    variant="body1"
                    textAlign="right"
                  >
                    +{item.churn_rate}%
                  </Typography>
                  {/* <Button
                    size="small"

                    variant="text"
                    color="primary"
                    sx={{
                      ml: 1,
                      alignSelf: "center",
                      fontWeight: "normal",
                      backgroundColor: `${theme.colors.primary.lighter}`,
                      "&:hover": {
                        backgroundColor: `${theme.colors.primary.main}`,
                        color: `${theme.palette.getContrastText(
                          theme.colors.primary.main
                        )}`,
                      },
                    }}
                  >
                    {t("View")}
                  </Button> */}
                </Box>
              </ListItemText>
            </ListItem>  
          </Fragment>
        ))}
        {/* </Scrollbar> */}
        </Box>
      </List>
    </Card>
  );
}

export default Block8;