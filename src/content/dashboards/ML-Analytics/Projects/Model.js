import {
  Box,
  Card,
  Typography,
  Avatar,
  styled,
  useTheme,
  alpha,
} from '@mui/material';

import SportsBasketballTwoToneIcon from '@mui/icons-material/SportsBasketballTwoTone';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import LocalConvenienceStoreTwoToneIcon from '@mui/icons-material/LocalConvenienceStoreTwoTone';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AvatarInfo = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.info.main};
        color: ${theme.palette.getContrastText(theme.colors.info.dark)};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.info};
        top: -${theme.spacing(4)};
        position: absolute;
        left: ${theme.spacing(3)};
  `
);

const useStyles = makeStyles((theme) => ({
  cardborder: {
    zIndex: 6,
    boxShadow:
      `0 0.56875rem 3.3rem ${alpha(theme.colors.info.dark, 0.1)},
        0 0.9975rem 2.4rem ${alpha(theme.colors.info.dark, 0.2)},
        0 0.35rem 1rem ${alpha(theme.colors.info.dark, 0.3)},
        0 0.225rem 0.8rem ${alpha(theme.colors.info.dark, 0.4)} !important`
  },
  card: {
    transition: `${theme.transitions.create(['box-shadow'])}`,
    position: 'relative',
    zIndex: 5
  },
  corousel: {
    buttonWrapper: {
      position: "absolute",
      color: "black !important",
      height: "100px",
      backgroundColor: "transparent",
      top: "calc(50% - 70px)",
      '&:hover': {
        '& $button': {
          backgroundColor: "transparent",
          filter: "brightness(120%)",
          opacity: "0.4"
        }
      }
    },
  }
}));

function Block8() {
  const [model, setModel] = useState("churn");

  const items = [
    {
      key: "churn",
      title: "Churn Prediction",
      icon: <AssessmentTwoToneIcon fontSize="large" />,
      description: "You can build unlimited layout styles using any of the 500+ included components and elements..."
    },
    {
      key: "lead-scoring",
      title: "Lead Scoring",
      icon: <SportsBasketballTwoToneIcon fontSize="large" />,
      description: "You can build unlimited layout styles using any of the 500+ included components and elements..."
    },
    {
      key: "customer-segmentation",
      title: "Segmentation",
      icon: <LocalConvenienceStoreTwoToneIcon fontSize="large" />,
      description: "You can build unlimited layout styles using any of the 500+ included components and elements..."
    },
    {
      key: "revenue-attribution",
      title: "Revenue Attribution",
      icon: <LocalConvenienceStoreTwoToneIcon fontSize="large" />,
      description: "You can build unlimited layout styles using any of the 500+ included components and elements..."
    },
    {
      key: "up-sell",
      title: "Up-Sell",
      icon: <LocalConvenienceStoreTwoToneIcon fontSize="large" />,
      description: "You can build unlimited layout styles using any of the 500+ included components and elements..."
    },
    {
      key: "cross-sell",
      title: "Cross Sell",
      icon: <LocalConvenienceStoreTwoToneIcon fontSize="large" />,
      description: "You can build unlimited layout styles using any of the 500+ included components and elements..."
    },
    {
      key: "customer-journey",
      title: "Customer Journey",
      icon: <LocalConvenienceStoreTwoToneIcon fontSize="large" />,
      description: "You can build unlimited layout styles using any of the 500+ included components and elements..."
    },
    {
      key: "sales-forecasting",
      title: "Sales Forecasting",
      icon: <LocalConvenienceStoreTwoToneIcon fontSize="large" />,
      description: "You can build unlimited layout styles using any of the 500+ included components and elements..."
    },
    {
      key: "custom-model",
      title: "Custom Model",
      icon: <LocalConvenienceStoreTwoToneIcon fontSize="large" />,
      description: "You can build unlimited layout styles using any of the 500+ included components and elements..."
    }
  ]

  return (

    <Carousel
      fullHeightHover={false}
      autoPlay={false}
      navButtonsAlwaysVisible={true}
      indicators={false}
      height="20rem"
      animation="slide"
      duration={1000}
      navButtonsProps={{
        style: {
          backgroundColor: 'transparent',
          color: "black"
        }
      }}
    >
      <Box style={{ display: "flex", marginLeft: "3rem", marginRight: "3rem" }}>
        {items.slice(0, 3).map((e) => {
          console.log(e.key)
          return <CardComponent key={e.key} current={e.key} setModel={setModel} model={model} title={e.title} icon={e.icon} description={e.description} />
        })}
      </Box>
      <Box style={{ display: "flex", marginLeft: "3rem", marginRight: "3rem" }}>
        {items.slice(3, 6).map((e) => {
          return <CardComponent key={e.key} current={e.key} setModel={setModel} model={model} title={e.title} icon={e.icon} description={e.description} />
        })}
      </Box>
      <Box style={{ display: "flex", marginLeft: "3rem", marginRight: "3rem" }}>
        {items.slice(6, 9).map((e) => {
          return <CardComponent key={e.key} current={e.key} setModel={setModel} model={model} title={e.title} icon={e.icon} description={e.description} />
        })}
      </Box>
    </Carousel>
  );
}

function CardComponent(props) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Card className={props.model === props.current ? classes.cardborder : classes.card}
      onClick={() => props.setModel(props.current)}
      sx={{
        overflow: 'visible',
        position: 'relative',
        pt: 5,
        my: 4,
        mx: 2,
      }}
    >
      <AvatarInfo variant="rounded">
        {props.icon}
      </AvatarInfo>
      {props.model === props.current ? <CheckCircleIcon style={{ alignSelf: "center", color: `${theme.colors.success.dark}`, position: "absolute", top: 20, right: 30 }} /> : <></>}
      <Box p={3}>
        <Typography
          variant="h3"
          sx={{
            mb: 1,
            fontSize: `${theme.typography.pxToRem(22)}`
          }}
          style={{
            verticalAlign: 'middle',
            display: 'inline-flex'
          }}
        >
          {props.title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: `${theme.typography.pxToRem(16)}`
          }}
        >
          {props.description}
        </Typography>
      </Box>
    </Card>
  )
}

export default Block8;
