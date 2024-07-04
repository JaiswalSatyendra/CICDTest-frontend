import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import { Helmet } from "react-helmet-async";

import { Grid } from "@mui/material";

import Block1 from "../../blocks/Statistics/Block3";
import Block1a from "../../blocks/Statistics/Block3a";
import Block2 from "../../blocks/ListsLarge/Block8";
import Block10 from "../../blocks/ListsSmall/Block7";
import Block11 from "../../blocks/ListsSmall/Block8";
import PageHeader from "./PageHeader";
import Block3 from "./Block3";
import Block4 from "./Block4";
import Block5 from "./Block5";
/*
import Block6 from "./Block6";
import Block7 from "./Block7";
*/
import Block8 from "./Block8";
import Block9 from "./Block9";
/*
import Block12 from "./Block12";
import Block13 from "./Block13";
*/
import axios from "axios";
import { SessionContext } from "../../../contexts/SessionContext";
function BluePrint() {
  const navigate = useNavigate();
  // const [block1Data,setblock1Data] = useNavigate({paying_cust_total:"NA",paying_cust_this_month:"NA",cltv_total:"NA",cltv_this_month:"NA",brand_cust_total:"NA",brand_cust_this_month:"NA",retention_rate:"NA",retention_total:"NA"});
  // const [block1aData,setblock1aData] = useNavigate({net_promoter_score:"NA",net_promoter_rate:"NA",churn_total:"NA",churn_rate:"NA",repeat_purchase_total:"NA",repeat_purchase_rate:"NA",customer_loyality:"NA",customer_loyality_rate:"NA"});
  const [dashboardData, setdashboardData] = useState({});
  const [surveyCount, setsurveyCount] = useState(0);
  const [userActivityList, setuserActivityList] = useState([]);
  const [surveyProjectList, setsurveyProjectList] = useState([]);

  const [session, , , ,] = useContext(SessionContext);
  const { user } = session;

  useEffect(() => {
    let res = axios.post(
      `${process.env.REACT_APP_API_URL}/userEmailTemplates/create`,
      {
        title: "testing04",
        unlayer: false,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(res);
  }, [navigate]);


  useEffect(() => {
    console.log("ddd")
    axios.post(
      `${process.env.REACT_APP_API_URL}/dataset/getDashboardData`,
      {
        user_id: user._id
      },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    ).then((response) => {
      setdashboardData(response.data.data[0] === undefined ? [] : response.data.data[0]);
     axios.post(
        `${process.env.REACT_APP_API_URL}/dataset/surveyprojectlist`,
        {
          userid: user._id,
          status:"success"
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      ).then((response) => {
      
        let newList = [];
        response.data.data.forEach(ele => {
          let index = newList.findIndex(x => x.projectid === ele.projectid);
          if (index == -1) {
            newList.push({ projectid: ele.projectid,tablename:ele.tablename,templateName:ele.templateName, analysisName: new Array(ele.analysisName) })
          } else {
            newList[index].analysisName.push(ele.analysisName)
          }

        })
        // response.data.data.forEach(element => {
        //   if(element.status=="running"){
        //     element.status = "progress"
        //   }
        //   else if(element.status=="fail"){
        //     element.status = "failed"
        //   }
        //   newList.push(element)
        // });
        
        setsurveyCount(newList.length);
        setsurveyProjectList(newList)
      })
        .catch((err) => {
          // setLoaderShow(false)
        });;
        })
      .catch((err) => {
        // setLoaderShow(false)
      });;

     
      axios.post(
        `${process.env.REACT_APP_API_URL}/dataset/getUserActivity`,
        {
          user_id: user._id
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      ).then((response) => {
        setuserActivityList(response.data.data);
      })
        .catch((err) => {
          // setLoaderShow(false)
        });;
    

  }, []);





  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader dashboardData={dashboardData}/>
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
          <Block1 dashboardData={dashboardData} />
        </Grid>
        <Grid item xs={12}>
          <Block1a dashboardData={dashboardData} />
        </Grid>
        <Grid item md={7} xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
          >
            <Grid item xs={12}>
              <Block2 dashboardData={dashboardData} />
            </Grid>
            <Grid item xs={12}>
              <Block4 />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5} xs={12}>
          <Block3 dashboardData={dashboardData}/>
        </Grid>
        <Grid item xs={12}>
          <Block5 dashboardData={dashboardData} />
        </Grid>
        <Grid item md={5} xs={12}>
          <Block8 surveyProjectList={surveyProjectList}/>
        </Grid>
        <Grid item md={7} xs={12}>
          <Block9 dashboardData={dashboardData} surveyCount={surveyCount} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block10 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block11 userActivityList={userActivityList}/>
        </Grid>
      </Grid>
    </>
  );
}

export default BluePrint;
