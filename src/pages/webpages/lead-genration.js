import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../components/molecules/Navbar";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  TextField,
  IconButton,
  Typography,
  Box,
  CardMedia,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  ListItemText,
} from "@mui/material";

import integrationBanner from "../../assets/img/integrationBanner.png";
import HomeFooter from "../../components/home-footer";
import { Helmet } from "react-helmet";
import {
  faqsListdp,
  faqsListp,
  faqsListPricing,
  faqsListResources,
  faqsListTypeform,
} from "../../assets/data/fasq";
import { useNavigate } from "react-router-dom";
import { LeadGenration } from "../../assets/data/metadata-list";
import { LeadGenrationMarkup } from "../../assets/data/schema-markup";
import {
  CRMListData,
  customerServiceListData,
  dataWarehouseDatabaseListData,
  financialListData,
  reviewsListData,
  socialmediaList,
  SurveyListData,
} from "../../assets/data/create-data-connection";

function LeadGenrationFrom() {
  const [scroll, setScroll] = useState(false);
  const [faqListp, setfaqListp] = React.useState([]);

  const [isSubmitShedule, setisSubmitShedule] = useState(false);
  const [faqListdp, setfaqListdp] = React.useState([]);
  const [faqListPricing, setfaqListPricing] = React.useState([]);
  const [faqListResources, setfaqListResources] = React.useState([]);
  const [faqListTypeform, setfaqListTypeform] = React.useState([]);
  const sections = document.querySelectorAll("section[id]"); 
  const [isSubmit, setisSubmit] = useState(false);


  const [industryList, setindustryList]= useState([ 
    'Industry type*',
    'Ad-tech',
    'Agency - Independent',
    'Agency - Networked',
    'Automotive',
    'Consulting',
    'Consumer Electronics',
    'Consumer Packaged Goods',
    'Education',
    'Financial and Business Services',
    'Gaming',
    'Hospitality',
    'Internet Technology',
    'Manufacturing',
    'Martech',
    'Non-profit',
    'Pharmaceutical',
    'Platforms',
    'Public Sector',
    'Publishing',
    'Retail',
    'Sports',
    'Student',
    'Telecoms',
    'TV',
    'Utilities/Energy',
  ]) 
  const [countryList, setcountryList]= useState([  
    'Cook Islands',
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bonaire sint eustatius and saba',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory',
    'Brunei Darussalam',
    'Bulgaria',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Christmas Islands',
    'Colombia',
    'Comoros',
    'Congo',
    'Congo, Democratic Republic of (DRC)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Curacao',
    // <option value="Cyprus">Cyprus',
    // <option value="Czech Republic">Czech Republic',
    // <option value="Denmark">Denmark',
    // <option value="Djibouti">Djibouti',
    // <option value="Dominica">Dominica',
    // <option value="Dominican Republic">Dominican Republic',
    // <option value="Ecuador">Ecuador',
    // <option value="Egypt">Egypt',
    // <option value="El Salvador">El Salvador',
    // <option value="Equatorial Guinea">Equatorial Guinea',
    // <option value="Eritrea">Eritrea',
    // <option value="Estonia">Estonia',
    // <option value="Ethiopia">Ethiopia',
    // <option value="Falkland Islands">Falkland Islands',
    // <option value="Faroe Islands">Faroe Islands',
    // <option value="Fiji">Fiji',
    // <option value="Finland">Finland',
    // <option value="France">France',
    // <option value="French Guiana">French Guiana',
    // <option value="French Polynesia">French Polynesia',
    // <option value="French Southern Territories">French Southern Territories',
    // <option value="Gabon">Gabon',
    // <option value="Gambia">Gambia, Republic of The',
    // <option value="Georgia">Georgia',
    // <option value="Germany">Germany',
    // <option value="Ghana">Ghana',
    // <option value="Gibraltar">Gibraltar',
    // <option value="Greece">Greece',
    // <option value="Greenland">Greenland',
    // <option value="Grenada">Grenada',
    // <option value="Guadeloupe">Guadeloupe',
    // <option value="Guatemala">Guatemala',
    // <option value="Guinea">Guinea',
    // <option value="Guinea-Bissau">Guinea-Bissau',
    // <option value="Guyana">Guyana',
    // <option value="Haiti">Haiti',
    // <option value="Honduras">Honduras',
    // <option value="Hong Kong">Hong Kong',
    // <option value="Hungary">Hungary',
    // <option value="Iceland">Iceland',
    // <option value="India">India',
    // <option value="Indonesia">Indonesia',
    // <option value="Iran">Iran',
    // <option value="Iraq">Iraq',
    // <option value="Ireland">Ireland',
    // <option value="Israel">Israel',
    // <option value="Italy">Italy',
    // <option value="Ivory Coast">Ivory Coast (Cote d’Ivoire)',
    // <option value="Jamaica">Jamaica',
    // <option value="Japan">Japan',
    // <option value="Jordan">Jordan',
    // <option value="Kazakhstan">Kazakhstan',
    // <option value="Kenya">Kenya',
    // <option value="Kiribati">Kiribati',
    // <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of',
    // <option value="Korea, Republic of">Korea, Republic of',
    // <option value="Kuwait">Kuwait',
    // <option value="Kyrgyzstan">Kyrgyz Republic (Kyrgyzstan)',
    // <option value="Laos">Laos',
    // <option value="Latvia">Latvia',
    // <option value="Lebanon">Lebanon',
    // <option value="Lesotho">Lesotho',
    // <option value="Liberia">Liberia',
    // <option value="Libya">Libya',
    // <option value="Liechtenstein">Liechtenstein',
    // <option value="Lithuania">Lithuania',
    // <option value="Luxembourg">Luxembourg',
    // <option value="Madagascar">Madagascar',
    // <option value="Malawi">Malawi',
    // <option value="Malaysia">Malaysia',
    // <option value="Maldives">Maldives',
    // <option value="Mali">Mali',
    // <option value="Malta">Malta',
    // <option value="Martinique">Martinique',
    // <option value="Mauritania">Mauritania',
    // <option value="Mauritius">Mauritius',
    // <option value="Mayotte">Mayotte',
    // <option value="Mexico">Mexico',
    // <option value="Micronesia">Micronesia',
    // <option value="Moldova">Moldova, Republic of',
    // <option value="Monaco">Monaco',
    // <option value="Mongolia">Mongolia',
    // <option value="Montenegro">Montenegro',
    // <option value="Monstserrat">Montserrat',
    // <option value="Morocco">Morocco',
    // <option value="Mozambique">Mozambique',
    // <option value="Myanmar, (Burma)">Myanmar/Burma',
    // <option value="Namibia">Namibia',
    // <option value="Nauru">Nauru',
    // <option value="Nepal">Nepal',
    // <option value="Netherlands">Netherlands',
    // <option value="New Zealand">New Zealand',
    // <option value="Nicaragua">Nicaragua',
    // <option value="Niger">Niger',
    // <option value="Nigeria">Nigeria',
    // <option value="Norway">Norway',
    // <option value="Oman">Oman',
    // <option value="Pakistan">Pakistan',
    // <option value="Palau">Palau',
    // <option value="Panama">Panama',
    // <option value="Papua New Guinea">Papua New Guinea',
    // <option value="Peru">Peru',
    // <option value="Philippines">Philippines',
    // <option value="Poland">Poland',
    // <option value="Portugal">Portugal',
    // <option value="Qatar">Qatar',
    // <option value="Romania">Romania',
    // <option value="Russian Federation">Russian Federation',
    // <option value="Rwanda">Rwanda',
    // <option value="Saint Kitts and Nevis">Saint Kitts and Nevis',
    // <option value="Saint Lucia">Saint Lucia',
    // <option value="Saint Vincent &amp; the Grenadines">Saint Vincent and the Grenadines',
    // <option value="Samoa">Samoa',
    // <option value="San Marino">San Marino',
    // <option value="Sao Tome &amp; Principe">Sao Tome and Principe',
    // <option value="Saudi Arabia">Saudi Arabia',
    // <option value="Senegal">Senegal',
    // <option value="Serbia">Serbia',
    // <option value="Seychelles">Seychelles',
    // <option value="Sierra Leone">Sierra Leone',
    // <option value="Singapore">Singapore',
    // <option value="Slovakia">Slovak Republic (Slovakia)',
    // <option value="Slovenia">Slovenia',
    // <option value="Solomon Islands">Solomon Islands',
    // <option value="Somalia">Somalia',
    // <option value="South Africa">South Africa',
    // <option value="South Sudan">South Sudan',
    // <option value="Spain">Spain',
    // <option value="Sri Lanka">Sri Lanka',
    // <option value="Sudan">Sudan',
    // <option value="Suriname">Suriname',
    // <option value="Swaziland">Swaziland',
    // <option value="Sweden">Sweden',
    // <option value="Switzerland">Switzerland',
    // <option value="Syria">Syria',
    // <option value="Taiwan">Taiwan',
    // <option value="Tajikistan">Tajikistan',
    // <option value="Tanzania">Tanzania',
    // <option value="Thailand">Thailand',
    // <option value="Timor Leste">Timor Leste',
    // <option value="Togo">Togo',
    // <option value="Tonga">Tonga',
    // <option value="Trinidad &amp; Tobago">Trinidad and Tobago',
    // <option value="true">true',
    // <option value="Tunisia">Tunisia',
    // <option value="Turkey">Turkey',
    // <option value="Turkmenistan">Turkmenistan',
    // <option value="Turks &amp; Caicos Islands">Turks and Caicos Islands',
    // <option value="Tuvalu">Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'Uruguay',
    'US',
    'Uzbekistan',
    'Vanuatu">Vanuatu',
    'Vatican City',
    'Vietnam',
    'Virgin Islands (UK)',
    'Virgin Islands (US)',
    'Yemen',
    'Zambia',
    'Zimbabwe',
    'Guernsey',
    'Heard Island and McDonald Islands',
    'Isle of Man',
    'Jersey',
    'Macao',
    'Macedonia, the former Yugoslav Republic of',
    'New Caledonia',
    'Niue',
    'Norfolk Island',
    'Palestine',
    'Pitcairn',
    'Reunion',
    'Saint Barthélemy',
    'Saint Helena, Ascension and Tristan da Cunha',
    'Saint Martin (French part)',
    'Saint Pierre and Miquelon',
    'Sint Maarten (Dutch part)',
    'South Georgia and the South Sandwich Islands',
    'Svalbard and Jan Mayen',
    'Tokelau',
    'Wallis and Futuna',
    'Western Sahara',
    'Cocos (Keeling) Islands',
    'Aland Islands',
    'Venezuela, Bolivarian Republic of',
     'Bolivia, Plurinational State of',
  ])
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    cname: "",
    phone: "",  
    industryType:"", 
    scountry:""
  });
 
  function submitForm() {
    sendMail(data.fname, data.email, null);
  }
  function handle(e) {
    let newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }
 
  const selectFromParam = (e, val, label) => {
    let tmpcustomaxis = { ...data }
    tmpcustomaxis[label] = val
    setData(tmpcustomaxis);
    console.log(data)
  }


  function sendMail() {
    fetch(`${process.env.REACT_APP_API_URL}/survey/sendMailleadGenration`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        token: Cookies.get("token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setisSubmit(true);
        // setData({
        //   fname: "",
        //   lname: "",
        //   email: "",
        //   cname: "",
        //   phone: "", 
        //   helptext: "",
        // });
      });
  }
  const navigate = useNavigate();
  const handleClick = () => navigate("/scheduleDemo");

  useEffect(() => {
    setfaqListp(faqsListp);
    setfaqListdp(faqsListdp);
    setfaqListPricing(faqsListPricing);
    setfaqListResources(faqsListResources);
    setfaqListTypeform(faqsListTypeform);
  }, []);

  return (
    <>
      <div id="Survey"> </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(LeadGenrationMarkup),
        }}
      />
      <Helmet>
        <title>{LeadGenration.title} </title>
        <meta
          name="description"
          content={LeadGenration.description}
          data-react-helmet="true"
        />
        <meta name="keywords" content={LeadGenration.keywords} />
        <meta property="image" content={LeadGenration.image} />
        <meta property="url" content={LeadGenration.url} />
        <meta property="publisher" content={LeadGenration.publisher} />
        <meta property="author " content={LeadGenration.author} />
        <meta property="site_name" content={LeadGenration.site_name} />
        <meta property="locale" content={LeadGenration.locale} />
        <meta property="type" content={LeadGenration.type} />
        <link rel="canonical" href={LeadGenration.canonical} />
      </Helmet>

      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="banner-onlyheading">
        <section className="container-home ">
          <div className="bedcurms">
            <b> 5 Things </b>
          </div>
          <h1 className="mb-3 d-none">
            You Can Do to Make Your Customer Insights Job Easier RIGHT NOW
          </h1>
          <div className="heading4 mb-3 mt-3">
            You Can Do to Make Your Customer{" "}
            <b>Insights Job Easier RIGHT NOW </b>
          </div>
        </section>
      </div>
      {/* ------------------- banner   ------------------- */}
      <br />
      <br />
      <div className="container-home">
        <Grid
          container
          spacing={2}
          direction="row"
          // justifyContent="center"
          // alignItems="center"
        >
          <Grid item xs={12} md={8} lg={8}>
            {" "}
            <br />
            <br />
            <div>
              <p>
                <h4 className="check-heading">Short on time?</h4>
                We’ve got you covered. This guide will quickly walk you through
                five transformative strategies to enhance your customer insights
                game:
              </p>
              <br />
              <p>
                <h4 className="check-heading">
                  Combine Qualitative and Quantitative Analysis
                </h4>
                Learn how merging qualitative insights with quantitative data
                can offer a comprehensive view of your customers.
              </p>
              <br />
              <p>
                <h4 className="check-heading">
                  Leverage Prescriptive Analytics
                </h4>
                Discover how prescriptive analytics can guide you toward the
                best actions based on your data insights.
              </p>
              <br />

              <p>
                <h4 className="check-heading">
                  Utilize Generative AI for Strategic Planning
                </h4>
                See how generative AI can streamline your strategic planning and
                significantly reduce your workload.
              </p>
              <br />
              <p>
                <h4 className="check-heading">
                  Implement Customer Journey Analytics
                </h4>
                Understand how tracking customer interactions can boost
                satisfaction and predict behavior.
              </p>
              <br />
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <div className="leadgernration-form">
              <h3 className="mb-3 text-center"> Unlock the guide</h3>
              <div className="from">
                {isSubmitShedule ? (
                  <div className="emailsuccessfulsubmitfooter">
                    Thanks. We’ll get back to you shortly. In the meantime, feel
                    free to check out{" "}
                    <Link to={"/blogs"}>
                      <b>our blog</b>
                    </Link>{" "}
                    for the latest marketing and trends updates.
                  </div>
                ) : (
                  <>
                    <form>
                     <div className="mt-2 mb-3">
                     <input
                        type="text"
                        placeholder="Work email address" 
                        onChange={(e) => {
                            selectFromParam(e,e.target.value,'email');
                          }}
                        name="email"
                        value={data.email}
                        id="email"
                        required
                      /> <br />  <br />  
                     </div>
                     <div className="mt-2 mb-3"> 
                      <input
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => {
                            selectFromParam(e,e.target.value,'fname');
                          }}
                        name="fname"
                        value={data.fname}
                        id="fname"
                        required
                      />
                      <br />  <br />   </div>
                      <div className="mt-2 mb-3"> 
                      <input
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => {
                            selectFromParam(e,e.target.value,'lname');
                          }}
                        name="lname"
                        value={data.lname}
                        id="lname"
                      /><br />  <br />   </div>
                      <div className="mt-2 mb-3"> 
                      <input
                        type="text"
                        placeholder="Company name" 
                        onChange={(e) => {
                            selectFromParam(e,e.target.value,'cname');
                          }}
                        name="cname"
                        value={data.cname}
                        id="cname"
                      /><br />  <br />   </div>
                      <div className="mt-2 mb-3"> 
                      <input
                        type="text"
                        placeholder="Phone" 
                        onChange={(e) => {
                            selectFromParam(e,e.target.value,'phone');
                          }}
                        name="phone"
                        value={data.phone}
                        id="phone"
                        required
                      /><br />  <br />   </div>
                       <div className="mt-2 mb-3"> 
                       <FormControl sx={{ minWidth: '100%' }} size="small" className="formControl">
                              <InputLabel id="cxaxis">Industry type</InputLabel>
                              <Select
                                labelId="cxaxis"
                                id="cxaxis"
                                value={data.industryType}
                                label="Industry type"
                              >
                              {industryList.map(
                                  (item, i) => (
                                    <MenuItem
                                      key={item}
                                      value={item}
                                      onClick={(e) => {
                                        selectFromParam(e, item, 'industryType');
                                      }}
                                    >
                                      <ListItemText primary={item} />
                                    </MenuItem>
                                  )
                                )}  
                              </Select>
                            </FormControl><br />  <br />   </div>
                            <div className="mt-2 mb-3"> 
                       <FormControl sx={{ minWidth: '100%' }} size="small" className="formControl">
                              <InputLabel id="cxaxis">Select Country</InputLabel>
                              <Select
                                labelId="cxaxis"
                                id="cxaxis"
                                value={data.scountry}
                                label="Industry type"
                              >
                              {countryList.map(
                                  (item, i) => (
                                    <MenuItem
                                      key={item}
                                      value={item}
                                      onClick={(e) => {
                                        selectFromParam(e, item, 'scountry');
                                      }}
                                    >
                                      <ListItemText primary={item} />
                                    </MenuItem>
                                  )
                                )}  
                              </Select>
                            </FormControl><br />  <br />   </div>
                      <br />
                      <button
                        onClick={(e) => {
                          submitForm();
                        }}
                      >
                        Submit
                      </button>
                      <br />
                    </form>
                    
                  </>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
        <br />
        <br />
      </div>
      <HomeFooter />
    </>
  );
}

export default LeadGenrationFrom;
