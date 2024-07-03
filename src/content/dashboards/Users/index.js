import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Grid } from "@mui/material";
import useRefMounted from "../../../hooks/useRefMounted";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import Results from "./Results";
import PageHeader from "./PageHeader";
import axios from "axios";

function ManagementUsers() {
  const [users, setUsers] = useState();
  const isMountedRef = useRefMounted(); // /user/getUser

  const getUsers = useCallback(async () => {
    try {
      if (isMountedRef.current) {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getUser`, { withCredentials: true })
        console.log(response.data.user)
        //setUsers(response.data.user)
      }
    } catch (err) {
      console.log(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);


  return (
    <>
      <Helmet>
        <title>Users - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Results users={users} />
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementUsers;
