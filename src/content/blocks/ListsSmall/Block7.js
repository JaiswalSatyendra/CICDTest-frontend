import {
  Box,
  Card,
  Typography,
  IconButton,
  ListItemText,
  ListItem,
  Avatar,
  List,
  Button,
  ListItemAvatar,
  Divider,
  alpha,
  styled,
  useTheme,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import Scrollbar from "../../../components/Scrollbar";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import AutoAwesomeMosaicTwoToneIcon from "@mui/icons-material/AutoAwesomeMosaicTwoTone";
import ContactPhoneTwoToneIcon from "@mui/icons-material/ContactPhoneTwoTone";
import EvStationTwoToneIcon from "@mui/icons-material/EvStationTwoTone";
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";
import OndemandVideoTwoToneIcon from "@mui/icons-material/OndemandVideoTwoTone";

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
    border-radius: 100px;
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};

    .MuiSvgIcon-root {
        transform-origin: center;
        transform: scale(1);
        transition: ${theme.transitions.create(["transform"])};
    }

    &:hover {
        .MuiSvgIcon-root {
            transform: scale(1.4);
        }
    }
  `
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: bold;
    text-transform: uppercase;
    border-radius: ${theme.general.borderRadiusSm};
    padding: ${theme.spacing(0.5, 1)};
  `
);

function Block7() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card>
      <Box
        p={2.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography gutterBottom variant="h4">
            {t("Platform Navigation Pills")}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          height: 350,
        }}
      >
        <Scrollbar>
          <List disablePadding>
            <ListItem
              sx={{
                p: 2.5,
              }}
            >
              <ListItemAvatar
                sx={{
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <Avatar
                  sx={{
                    background: "transparent",
                    color: `${theme.colors.primary.main}`,
                    border: `${theme.colors.primary.main} solid 2px`,
                    width: 58,
                    height: 58,
                  }}
                >
                  <OndemandVideoTwoToneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    gutterBottom
                    variant="h4"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {t("Datasets")}
                  </Typography>
                }
                secondary={
                  <Typography noWrap variant="subtitle2">
                    {t("Integrate Your Data Source with 1-Click")}
                  </Typography>
                }
              />
              <IconButtonWrapper color="primary">
                <ArrowForwardTwoToneIcon fontSize="small" />
              </IconButtonWrapper>
            </ListItem>
            <Divider />
            <ListItem
              sx={{
                p: 2.5,
              }}
            >
              <ListItemAvatar
                sx={{
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <Avatar
                  sx={{
                    background: "transparent",
                    color: `${theme.colors.primary.main}`,
                    border: `${theme.colors.primary.main} solid 2px`,
                    width: 58,
                    height: 58,
                  }}
                >
                  <AutoAwesomeMosaicTwoToneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    gutterBottom
                    variant="h4"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {t("Churn Prediction")}
                    <LabelWrapper
                      ml={1}
                      component="span"
                      sx={{
                        background: `${alpha(theme.colors.info.light, 0.2)}`,
                        color: `${theme.colors.info.main}`,
                      }}
                    >
                      {t("New")}
                    </LabelWrapper>
                  </Typography>
                }
                secondary={
                  <Typography noWrap variant="subtitle2">
                    {t("Compute your churning customers")}
                  </Typography>
                }
              />
              <IconButtonWrapper color="primary">
                <ArrowForwardTwoToneIcon fontSize="small" />
              </IconButtonWrapper>
            </ListItem>
            <Divider />
            <ListItem
              sx={{
                p: 2.5,
              }}
            >
              <ListItemAvatar
                sx={{
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <Avatar
                  sx={{
                    background: "transparent",
                    color: `${theme.colors.primary.main}`,
                    border: `${theme.colors.primary.main} solid 2px`,
                    width: 58,
                    height: 58,
                  }}
                >
                  <EvStationTwoToneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    gutterBottom
                    variant="h4"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {t("/emails")}
                    <LabelWrapper
                      ml={1}
                      component="span"
                      sx={{
                        background: `${alpha(theme.colors.error.light, 0.2)}`,
                        color: `${theme.colors.error.main}`,
                      }}
                    >
                      {t("Hot")}
                    </LabelWrapper>
                  </Typography>
                }
                secondary={
                  <Typography noWrap variant="subtitle2">
                    {t("Design your customized email campaign")}
                  </Typography>
                }
              />
              <IconButtonWrapper color="primary">
                <ArrowForwardTwoToneIcon fontSize="small" />
              </IconButtonWrapper>
            </ListItem>
            <Divider />
            <ListItem
              sx={{
                p: 2.5,
              }}
            >
              <ListItemAvatar
                sx={{
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <Avatar
                  sx={{
                    background: "transparent",
                    color: `${theme.colors.primary.main}`,
                    border: `${theme.colors.primary.main} solid 2px`,
                    width: 58,
                    height: 58,
                  }}
                >
                  <EvStationTwoToneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    gutterBottom
                    variant="h4"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {t("Security")}
                  </Typography>
                }
                secondary={
                  <Typography noWrap variant="subtitle2">
                    {t("GDPR Compliant Data Platform")}
                  </Typography>
                }
              />
              <IconButtonWrapper color="primary">
                <ArrowForwardTwoToneIcon fontSize="small" />
              </IconButtonWrapper>
            </ListItem>
            <Divider />
            <ListItem
              sx={{
                p: 2.5,
              }}
            >
              <ListItemAvatar
                sx={{
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <Avatar
                  sx={{
                    background: "transparent",
                    color: `${theme.colors.primary.main}`,
                    border: `${theme.colors.primary.main} solid 2px`,
                    width: 58,
                    height: 58,
                  }}
                >
                  <ContactPhoneTwoToneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    gutterBottom
                    variant="h4"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {t("Accounts")}
                    <LabelWrapper
                      ml={1}
                      component="span"
                      sx={{
                        background: `${alpha(theme.colors.warning.light, 0.2)}`,
                        color: `${theme.colors.warning.main}`,
                      }}
                    >
                      {t("In progress")}
                    </LabelWrapper>
                  </Typography>
                }
                secondary={
                  <Typography noWrap variant="subtitle2">
                    {t("Invite your team to run campaigns")}
                  </Typography>
                }
              />
              <IconButtonWrapper color="primary">
                <ArrowForwardTwoToneIcon fontSize="small" />
              </IconButtonWrapper>
            </ListItem>
          </List>
        </Scrollbar>
      </Box>
      <Divider />
      <Box
        p={2}
        sx={{
          textAlign: "center",
        }}
      >
      </Box>
    </Card>
  );
}

export default Block7;
