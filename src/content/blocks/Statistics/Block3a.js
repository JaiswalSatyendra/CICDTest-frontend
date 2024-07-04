import {
  Typography,
  Box,
  Avatar,
  Card,
  Grid,
  useTheme,
  styled
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import HubIcon from '@mui/icons-material/Hub';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import ScoreOutlinedIcon from '@mui/icons-material/ScoreOutlined';
const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      color:  ${theme.colors.alpha.trueWhite[100]};
      width: ${theme.spacing(5.5)};
      height: ${theme.spacing(5.5)};
`
);

function Block3(props) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} lg={3}>
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
            height: "210px"
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `${theme.colors.gradients.orange4}`
              }}
            >
              <HubIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                fontWeight: 'bold'
              }}
              variant="subtitle2"
              component="div"
            >
              {t('Net Promoter Score')}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center'
            }}
          >
            {props.dashboardData.paying_cust_total < 0 ?
              <ArrowDownwardTwoToneIcon
                sx={{
                  color: `${theme.colors.warning.main}`
                }}
              /> : <ArrowUpwardTwoToneIcon
                sx={{
                  color: `${theme.colors.success.main}`
                }}
              />
            }
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`
              }}
              variant="h1"
            >
              {props.dashboardData.nps_score === undefined ? "N/A" : props.dashboardData.nps_score.toFixed(1)}
            </Typography>
          </Box>
          {/* <Typography
            align="center"
            variant="body2"
            noWrap
            color="text.secondary"
            component="div"
          >
            <b>N/A%</b> from last month
          </Typography> */}
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
            height: "210px"
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `${theme.colors.gradients.blue5}`
              }}
            >
              <StarHalfIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                fontWeight: 'bold'
              }}
              variant="subtitle2"
              component="div"
            >
              {t('Churn Rate')}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center'
            }}
          >
            {props.dashboardData.churn_rate_monthly_change < 0 ?
              <ArrowDownwardTwoToneIcon
                sx={{
                  color: `${theme.colors.warning.main}`
                }}
              /> : <ArrowUpwardTwoToneIcon
                sx={{
                  color: `${theme.colors.success.main}`
                }}
              />
            }
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`
              }}
              variant="h1"
            >
              {props.dashboardData.churn_rate === undefined ? "N/A" : props.dashboardData.churn_rate.toFixed(1)}
            </Typography>
          </Box>
          <Typography
            align="center"
            variant="body2"
            noWrap
            color="text.secondary"
            component="div"
          >
            <b>{props.dashboardData.churn_rate_monthly_change < 0 ? null : "+"}{props.dashboardData.churn_rate_monthly_change == undefined ? "N/A" : props.dashboardData.churn_rate_monthly_change}%</b> from last month

          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
            height: "210px"
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `${theme.colors.gradients.yellowOrange}`
              }}
            >
              <AddShoppingCartIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                fontWeight: 'bold'
              }}
              variant="subtitle2"
              component="div"
            >
              {t('Repeat Purchase rate')}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center'
            }}
          >
            {props.dashboardData.repeat_purchase_rate_monthly_change < 0 ?
              <ArrowDownwardTwoToneIcon
                sx={{
                  color: `${theme.colors.warning.main}`
                }}
              /> : <ArrowUpwardTwoToneIcon
                sx={{
                  color: `${theme.colors.success.main}`
                }}
              />
            }
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`
              }}
              variant="h1"
            >
              {props.dashboardData.repeat_purchase_rate === undefined ? "N/A" : props.dashboardData.repeat_purchase_rate.toFixed(1)}
            </Typography>
          </Box>
          <Typography
            align="center"
            variant="body2"
            noWrap
            color="text.secondary"
            component="div"
          >
            <b>{props.dashboardData.repeat_purchase_rate_monthly_change < 0 ? null : "+"}{props.dashboardData.repeat_purchase_rate_monthly_change == undefined ? "N/A" : props.dashboardData.repeat_purchase_rate_monthly_change}%</b> from last month

          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
            height: "210px"
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `${theme.colors.gradients.skyBlue}`
              }}
            >
              <AssignmentIndIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                fontWeight: 'bold'
              }}
              variant="subtitle2"
              component="div"
            >
              {t('Customer Loyalty')}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center'
            }}
          >
            {props.dashboardData.customer_loyalty_monthly_change < 0 ?
              <ArrowDownwardTwoToneIcon
                sx={{
                  color: `${theme.colors.warning.main}`
                }}
              /> : <ArrowUpwardTwoToneIcon
                sx={{
                  color: `${theme.colors.success.main}`
                }}
              />
            }
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`
              }}
              variant="h1"
            >
              {props.dashboardData.customer_loyalty === undefined ? "N/A" : props.dashboardData.customer_loyalty.toFixed(1)}
            </Typography>
          </Box>
          <Typography
            align="center"
            variant="body2"
            noWrap
            color="text.secondary"
            component="div"
          >
            <b>{props.dashboardData.customer_loyalty_monthly_change < 0 ? null : "+"}{props.dashboardData.customer_loyalty_monthly_change == undefined ? "N/A" : props.dashboardData.customer_loyalty_monthly_change}%</b> from last month

          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Block3;