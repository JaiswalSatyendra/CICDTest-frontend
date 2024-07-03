import { makeStyles } from "@mui/styles";
import { Paper, Box, Typography } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const EmptyState = ({
  title,
  subtitle,
  icon,
  titleVariant = "h5",
  subtitleVariant = "subtitle2",
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.wrapper}>
      {icon ? icon : <LibraryBooksIcon />}
      <Box
        pt={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {title && <Typography variant={titleVariant}>{title}</Typography>}
        {subtitle && (
          <Typography variant={subtitleVariant}>{subtitle}</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default EmptyState;

EmptyState.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleVariant: PropTypes.string,
  subtitleVariant: PropTypes.string,
  icon: PropTypes.element,
};
