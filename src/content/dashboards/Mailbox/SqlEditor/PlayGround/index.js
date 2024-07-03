import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import DnsIcon from "@mui/icons-material/Dns";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import EmptyState from "../../../../components/SqlEditor/EmptyState";
import QueryEditor from "../../../../components/SqlEditor/QueryEditor";
import QueryResultTable from "../../../../components/SqlEditor/QueryResultTable";
import useAppContext from "../../../../hooks/SqlEditor/useAppContext";
import { DEFAULT_STRINGS } from "../../../../utils/SqlEditor/constants/Common";
import { SessionContext } from "../../../../contexts/SessionContext";
import useToast from "../../../../hooks/SqlEditor/useToast";
import Toast from "../../../../components/SqlEditor/Toast";
import {
  TOAST_ERROR,
  TOAST_SUCCESS,
} from "../../../../utils/SqlEditor/constants/ToastConstants";

/**
 * Playground for SQL
 * Wrapper Container
 * we can have Other Feature Components added to this
 * */
const Playground = () => {
  const [queryResults, setQueryResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { tablesData, selectedTable } = useAppContext();
  const [session, ,] = useContext(SessionContext);
  const { user } = session;

  const databaseName = user._id;

  const { isToastVisible, showToast, toastType, toastMessage } = useToast();

  /**
   * handles running the query selected by user and returns data for the query
   * and updating store/context if required */
  const handleOnQueryRun = useCallback(
    async (query) => {
      setLoading(true);
      const queryWithActualName = query.replace(
        selectedTable.aliasName,
        selectedTable.tableName
      );
      axios
        .post(`${process.env.REACT_APP_API_URL}/athena/execute`, {
          databaseName,
          query: queryWithActualName,
        })
        .then((res) => {
          if (res.data.success === true) {
            setQueryResults({
              rows: res.data.result.Items,
              metaData: tablesData[selectedTable.tableName].metaData,
            });
            showToast(TOAST_SUCCESS, "Query ran successfully");
          } else {
            setQueryResults({});
            setIsError(true);
            showToast(
              TOAST_ERROR,
              "Error while running query! Please check your query"
            );
          }
          setLoading(false);
        })
        .catch((err) => {
          setQueryResults({});
          setIsError(true);

          setLoading(false);
          showToast(
            TOAST_ERROR,
            "Error while running query! The problem is with the server"
          );
        });
    },
    [tablesData, selectedTable]
  );

  return (
    <Box display="flex" height="100%" width="100%" flexDirection="column">
      <QueryEditor onRunQuery={handleOnQueryRun} />
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress
            sx={{
              color: "#19857b",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      ) : Object.keys(queryResults).length === 0 &&
        queryResults.constructor === Object ? (
        isError ? (
          <EmptyState
            icon={<ErrorIcon fontSize="large" />}
            title={DEFAULT_STRINGS.ERROR_QUERY_TITLE}
            subtitle={DEFAULT_STRINGS.ERROR_QUERY_SUBTITLE}
          />
        ) : (
          <EmptyState
            icon={<DnsIcon fontSize="large" />}
            title={DEFAULT_STRINGS.WELCOME_MESSAGE_TITLE}
            subtitle={DEFAULT_STRINGS.WELCOME_MESSAGE_SUBTITLE}
          />
        )
      ) : (
        <QueryResultTable tableData={queryResults} />
      )}
      <Toast show={isToastVisible} type={toastType} message={toastMessage} />
    </Box>
  );
};

export default Playground;
