import { Button, Dialog, Box, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DialogActions, DialogContent, DialogTitle } from "../CustomDialog";
import {
  DEFAULT_STRINGS,
  noop,
} from "../../../utils/SqlEditor/constants/Common";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles((theme) => ({
  editButton: {
    marginLeft: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  rowValue: {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
}));

const TableRowDialog = ({
  row = {},
  showDialog = false,
  handleCancelAction = noop,
  handleSuccessAction = noop,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={showDialog}
      onClose={handleCancelAction}
      aria-labelledby="import-data-form-dialog-title"
    >
      {/* Title Section */}
      <DialogTitle
        id="import-data-form-dialog-title"
        onClose={handleCancelAction}
      >
        {DEFAULT_STRINGS.TABLE_ROW_DIALOG}
      </DialogTitle>

      {/* Dialog Content Area */}
      <DialogContent dividers>
        {Object.keys(row).map((columnName) => (
          <Box display="flex" my={3} flexDirection="column">
            <Box display="flex" alignItems="center" mb={1}>
              <Typography variant="h6">{columnName}</Typography>
              <IconButton
                disableRipple
                className={classes.editButton}
                color="secondary"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography className={classes.rowValue}>
              {row[columnName]}
            </Typography>
          </Box>
        ))}
      </DialogContent>

      {/* Dialog Action Buttons */}
      <DialogActions>
        <Button onClick={handleCancelAction} color="default">
          {DEFAULT_STRINGS.BUTTON_CLOSE_TEXT}
        </Button>
        <Button
          variant="contained"
          onClick={handleSuccessAction}
          color="secondary"
        >
          {DEFAULT_STRINGS.BUTTON_SAVE_CHANGES_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableRowDialog;
