import {
  Box,
  CardMedia,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  IconButton,
  Button,
  CardActions,
  Link,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(3)};
`
);

function ActivityTab() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src="/images/avatars/gaurav.jpg" />}
        action={
          <IconButton color="primary">
            <MoreHorizTwoToneIcon />
          </IconButton>
        }
        titleTypographyProps={{ variant: "h4" }}
        subheaderTypographyProps={{ variant: "subtitle2" }}
        title="Gaurav Gupta"
        subheader={
          <>
            Managing Partner, <Link href="#">#AI</Link>,{" "}
            <Link href="#">#Machine Learning</Link>, ConvertML Inc.
          </>
        }
      />
      <Box px={3} pb={2}>
        <Typography variant="h4" fontWeight="normal">
          Welcome to organizing your email campaigns for maximum productivity.
        </Typography>
      </Box>
      <CardMedia
        sx={{
          minHeight: 280,
        }}
        image={"/images/profile_cover_4.jpeg"}
        title="Card Cover"
      />
      <Box p={3}>
        <Typography
          variant="h2"
          sx={{
            pb: 1,
          }}
        >
          ConvertML - Design to bring customer within social network of brand
        </Typography>
        <Typography variant="subtitle2">
          <Link href="/">convertml.com</Link> • 4 {t("mins read")}
        </Typography>
      </Box>
      <Divider />
      <CardActionsWrapper
        sx={{
          display: { xs: "block", md: "flex" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button startIcon={<ThumbUpAltTwoToneIcon />} variant="contained">
            {t("Like")}
          </Button>
        </Box>
      </CardActionsWrapper>
    </Card>
  );
}

export default ActivityTab;
