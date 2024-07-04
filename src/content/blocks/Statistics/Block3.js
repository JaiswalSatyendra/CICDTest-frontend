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
import YardTwoToneIcon from '@mui/icons-material/YardTwoTone';
import SnowmobileTwoToneIcon from '@mui/icons-material/SnowmobileTwoTone';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
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
  function numberSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


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
                background: `${theme.colors.gradients.blue4}`
              }}
            >
              <PeopleAltOutlinedIcon fontSize="small" />
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
              {t('Paying Customers')}
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
            {/* <ArrowDownwardTwoToneIcon
              sx={{
                color: `${theme.colors.error.main}`
              }}
            /> */}
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
              {props.dashboardData.paying_cust_total == undefined ? "N/A" : numberSeparator(props.dashboardData.paying_cust_total)}
            </Typography>
          </Box>
          <Typography
            align="center"
            variant="body2"
            noWrap
            color="text.secondary"
            component="div"
          >
            <b>{props.dashboardData.paying_cust_this_month < 0 ? null : "+"}{props.dashboardData.paying_cust_this_month == undefined ? "N/A" : numberSeparator(props.dashboardData.paying_cust_this_month)}%</b> from last month
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
                background: `${theme.colors.gradients.orange3}`
              }}
            >
              <SupportTwoToneIcon fontSize="small" />
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
              {t('Average Customer LTV')}
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
            {props.dashboardData.cltv_total < 0 ?
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
              {props.dashboardData.cltv_total == undefined ? "N/A" : "$" + numberSeparator(parseInt(props.dashboardData.cltv_total))}
            </Typography>
          </Box>
          <Typography
            align="center"
            variant="body2"
            noWrap
            color="text.secondary"
            component="div"
          >
            <b>{props.dashboardData.cltv_monthly_change < 0 ? null : "+"}{props.dashboardData.cltv_monthly_change == undefined ? "N/A" : numberSeparator(props.dashboardData.cltv_monthly_change)}%</b> from last month
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
                background: `${theme.colors.success.main}`
              }}
            >
              <SignalCellularAltOutlinedIcon fontSize="small" />
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
              {t('Brand Customer Engagement Score')}
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
            {/* <ArrowDownwardTwoToneIcon
              sx={{
                color: `${theme.colors.warning.main}`
              }}
            /> */}

            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`
              }}
              variant="h1"
            >
              N/A
            </Typography>
          </Box>
          {/* <Typography
            align="center"
            variant="body2"
            noWrap
            color="text.secondary"
            component="div"
          >
            N/A
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
                background: `${theme.colors.primary.main}`
              }}
            >
              <ScoreOutlinedIcon fontSize="small" />
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
              {t('Retention Score')}
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

            {props.dashboardData.retention_rate_monthly_change < 0 ?
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
              {props.dashboardData.retention_rate == undefined ? "N/A" : numberSeparator(parseInt(props.dashboardData.retention_rate))}%

            </Typography>
          </Box>
          <Typography
            align="center"
            variant="body2"
            noWrap
            color="text.secondary"
            component="div"
          >
            <b> {props.dashboardData.retention_rate_monthly_change < 0 ? null : "+"}{props.dashboardData.retention_rate_monthly_change == undefined ? "N/A" : numberSeparator(props.dashboardData.retention_rate_monthly_change)}%</b> from last month

          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Block3;