import {
  Button,
  Card,
  List,
  CardContent,
  CardHeader,
  ListItemAvatar,
  Avatar,
  Link,
  Divider,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import TrendingDown from "@mui/icons-material/TrendingDown";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import Text from "../../../components/Text";

function RecentTransactions() {
  const { t } = useTranslation();

  const AvatarWrapperError = styled(Avatar)(
    ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color:  ${theme.colors.error.main};
`
  );

  const AvatarWrapperSuccess = styled(Avatar)(
    ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
  );

  const AvatarWrapperWarning = styled(Avatar)(
    ({ theme }) => `
      background-color: ${theme.colors.warning.lighter};
      color:  ${theme.colors.warning.main};
`
  );

  return (
    <Card>
      <CardHeader
        action={
          <Button size="small" href="#">
            {t("View all")}
          </Button>
        }
        title={t("Market Sentiments")}
      />
      <Divider />
      <CardContent>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemAvatar>
              <AvatarWrapperSuccess>
                <CheckIcon />
              </AvatarWrapperSuccess>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Text color="black">
                  <b>Japan followed by Switzerland and Israel has</b> lowest inflation in Jun’22
                </Text>
              }
              primaryTypographyProps={{
                variant: "body1",
                color: "textPrimary",
                gutterBottom: true,
                noWrap: true,
              }}
              secondary={
                <Text color="success">{t("Inflation Expanded")}</Text>
              }
              secondaryTypographyProps={{ variant: "body2", noWrap: true }}
            />
          </ListItem>
          <Divider
            sx={{
              my: 1.5,
            }}
          />
          <ListItem disableGutters>
            <ListItemAvatar>
              <AvatarWrapperWarning>
                <TrendingDown />
              </AvatarWrapperWarning>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Text color="black">
                  <b>India, Brazil, Russia and Turkey has highest inflation in Jun’22</b>
                </Text>
              }
              primaryTypographyProps={{
                variant: "body1",
                color: "textPrimary",
                gutterBottom: true,
                noWrap: true,
              }}
              secondary={<Text color="warning">{t("Inflation at Peak")}</Text>}
              secondaryTypographyProps={{ variant: "body2", noWrap: true }}
            />
          </ListItem>
          <Divider
            sx={{
              my: 1.5,
            }}
          />
          <ListItem disableGutters>
            <ListItemAvatar>
              <AvatarWrapperError>
                <CloseIcon />
              </AvatarWrapperError>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Text color="black">
                  <b>Amazon posts 7.2 percent increase in revenue, dip in growth in two decades</b>
                </Text>
              }
              primaryTypographyProps={{
                variant: "body1",
                color: "textPrimary",
                gutterBottom: true,
                noWrap: true,
              }}
              secondary={<Text color="error">{t("Growth Declined")}</Text>}
              secondaryTypographyProps={{ variant: "body2", noWrap: true }}
            />
          </ListItem>
          <Divider
            sx={{
              my: 1.5,
            }}
          />
          <ListItem disableGutters>
            <ListItemAvatar>
              <AvatarWrapperSuccess>
                <CheckIcon />
              </AvatarWrapperSuccess>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Text color="black">
                  <b>Amazon to acquire One Medical clinics in latest push into health care</b>
                </Text>
              }
              primaryTypographyProps={{
                variant: "body1",
                color: "textPrimary",
                gutterBottom: true,
                noWrap: true,
              }}
              secondary={
                <Text color="success">{t("Completed Successfully")}</Text>
              }
              secondaryTypographyProps={{ variant: "body2", noWrap: true }}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

export default RecentTransactions;
