import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Tooltip,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import Label from "../../../components/Label";
import ArrowUpwardTwoTone from "@mui/icons-material/ArrowUpwardTwoTone";

const ArrowUpwardWrapper = styled(ArrowUpwardTwoTone)(
  ({ theme }) => `
      color:  ${theme.palette.success.main};
`
);
function Orders() {
  const { t } = useTranslation();

  const data = {
    value: "393",
  };

  return (
    <Card
      sx={{
        px: 1,
        pt: 1,
      }}
    >
      <CardHeader
        sx={{
          pb: 0,
        }}
        titleTypographyProps={{
          variant: "subtitle2",
          fontWeight: "bold",
          color: "textSecondary",
        }}
        action={
          <Tooltip
            placement="top"
            arrow
            title={t("This section can have a description!")}
          >
            <IconButton size="small" color="secondary">
              <HelpOutlineTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        }
        title={t("Growth in Wages")}
      />
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3">{data.value}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Label color="success">+1.2%</Label>
          <ArrowUpwardWrapper
            sx={{
              ml: 0.5,
              mr: -0.2,
            }}
            fontSize="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default Orders;
