import React, { useEffect, useState } from "react";
import Navbar from "../../../components/molecules/Navbar";
import typeformIntegrationBanner from "../../../assets/img/customer-success.png";
import { Link } from "react-router-dom";
import HomeFooter from "../../../components/home-footer";
import { Helmet } from "react-helmet"; 
import { Grid } from "@mui/material";
import {ConvertMLUserGuide} from '../../../assets/data/metadata-list';
import { ConvertMLUserGuideData } from "../../../assets/data/schema-markup";


function ConvertMLUserGuidePage() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", navHighlighter);

  function navHighlighter() {
    let scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(".localPageNav a[href*=" + sectionId + "]")
          .classList.add("selected");
      } else {
        document
          .querySelector(".localPageNav a[href*=" + sectionId + "]")
          .classList.remove("selected");
      }
    });
  }

  return (
    <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ConvertMLUserGuideData),
        }}
      />

      <Helmet>
        ‍<title>{ConvertMLUserGuide.title}</title>
        <meta name="description" content={ConvertMLUserGuide.description} />
        <meta name="keywords" content={ConvertMLUserGuide.keywords} />
        <meta property="title" content={ConvertMLUserGuide.title} />
        <meta property="image" content="url_to_image" />
        <meta property="url" content={ConvertMLUserGuide.url} />
        <meta property="site_name" content="ConvertML" />
        <meta property="locale" content="en_US" />
        <meta property="type" content="insights" />
        <link rel="canonical" href={ConvertMLUserGuide.canonical} />
      </Helmet>
      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="banner-onlyheading">
        <section className="container-home ">
          {/* <div className="bedcurms">
            <Link to="/">Home</Link>»  
            <b>ConvertML User Guide</b>
          </div> */}
          <h1 className="d-none">  ConvertML <b>User Guide</b></h1>
          <div className="m-0 heading3">
            ConvertML <b>User Guide</b>
          </div><span id="convertMLBasicsstartyourFirstProject"></span>
        </section>
      </div>
      {/* ------------------- banner   ------------------- */}

      <div className="container-home">
        <Grid
          container
          spacing={2}
          direction="row"
          // justifyContent="center"
          // alignItems="center"
        >
          <Grid item xs={12} md={4} lg={4}>
            <div className={scroll ? "page-local-nav-fixed" : "page-local-nav"}> 
              <h3>Table of contents</h3>
              <ul className="localPageNav">
                <li>
                  <a href="#convertMLBasicsstartyourFirstProject">
                    ConvertML Basics & Start your First Project{" "}
                  </a>
                </li>
                <li>
                  <a href="#typeformintegrationbestpractices"> 
                    Typeform integration best practices
                  </a>
                  <ul>
                    <li>
                      <a href="#howtodesignyoursurveyforeffectiveanalysis">
                        How to design your survey for effective analysis
                      </a>
                      <ul>
                        <li>
                          <a href="#responses">Responses</a>{" "}
                        </li>
                        <li>
                          <a href="#design">Design</a>{" "}
                        </li>
                        <li>
                          <a href="#incentives">Incentives</a>{" "}
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#protip">Pro tip</a>
                    </li>
                  </ul>
                </li>
                {/* <li>
                  <a href="#hubSpotintegrationbestpractices"> 
                    HubSpot integration best practices
                  </a>
                </li> */}
                {/* <li>
                  <a href="#datamappingbestpractices">
                    Data mapping best practices
                  </a>
                </li> */}
                <li>
                  <a href="#analysisCSATNPSBrandloyalty">
                    Analysis - CSAT, NPS, Brand loyalty
                  </a>
                  <ul>
                    <li>
                      <a href="#npsanalysis">NPS analysis</a>
                      <ul>
                        <li>
                          <a href="#howcanImeasureNPS">
                            How can I measure NPS?{" "}
                          </a>{" "}
                        </li>
                        <li>
                          <a href="#whatifImnotcapturingthisinformationnlp">
                            What if I’m not capturing this information?
                          </a>{" "}
                        </li>
                        <li>
                          <a href="#howdoesConvertMLperform">
                            How does ConvertML perform NPS analysis?
                          </a>{" "}
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#csatanalysis">CSAT analysis</a>
                      <ul>
                        <li>
                          <a href="#howcanImeasurecustomersatisfaction">
                            How can I measure customer satisfaction?{" "}
                          </a>{" "}
                        </li>
                        <li>
                          <a href="#whatifImnotcapturingthisinformation">
                            What if I’m not capturing this information?
                          </a>{" "}
                        </li>
                        <li>
                          <a href="#howdoesConvertMLperformCSATanalysis">
                            How does ConvertML perform CSAT analysis?{" "}
                          </a>{" "}
                        </li>
                      </ul>
                    </li>
                    <li> 
                      <a href="#brandLoyaltyAnalysis">Brand Loyalty Analysis </a>
                      <ul>
                        <li>
                          <a href="#howdoImeasureBrandloyalty">
                            How do I measure Brand loyalty? 
                          </a>{" "}
                        </li>
                        <li>
                          <a href="#whatifImnotcapturingthisinformationbl">
                            What if I’m not capturing this information?{" "}
                          </a>{" "}
                        </li>
                        <li>
                          <a href="#howdoesConvertMLperformbrandloyaltyanalysis">
                            How does ConvertML perform brand loyalty analysis?{" "}
                          </a>{" "}
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#textualanalysis">Textual analysis </a>
                    </li>
                  </ul>
                </li>
                {/* <li> 
                  <a href="#dataupload"> Data upload</a>
                </li> */}
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <section id="convertMLBasicsstartyourFirstProject">
              <p>
                <h2 className="d-none">ConvertML Basics & Start your First Project</h2>
                <div className="heading4">ConvertML Basics & Start your First Project</div>
                ConvertML is a no-code integration and analytics tool that
                transforms your survey and CRM data into predictive insights in
                seconds. It works by taking the best of both worlds—quantitative
                and qualitative—to give you a holistic view of each customer.
                ConvertML swiftly connects your survey and CRM data to
                <ul>
                  <li>
                    provide granular-level insights into what, how, and why of
                    customer behavior
                  </li>
                  <li>
                    get instant dashboards on Net Promoter Score (NPS), Customer
                    satisfaction analysis (CSAT), Brand Loyalty (BL), time
                    series analysis, and more
                  </li>
                  <li>
                    use our custom ML models to predict churn and better your
                    cross-sell/up-sell strategies{" "}
                  </li>
                  <li>
                    talk to your data and get detailed answers through our
                    custom LLM models
                  </li>
                </ul>{" "}
              </p>
              <p>
                To get started, visit ConvertML's website and sign up for an
                account. Follow the registration process, and you'll be ready to
                integrate Typeform and HubSpot with ConvertML.
                <br />
                <br />
                <b>Here are a few things to remember: </b>
                <ul>
                  <li>
                    Note that the project name cannot have special characters
                    except the underscore.
                  </li>
                  <li>
                    You must already have an existing account to connect to
                    Typeform. If you don’t have one, you can always create it{" "}
                    <a
                      href="https://www.typeform.com/help/a/create-a-typeform-account-360029264992/"
                      target={"_blank"}
                    >
                      here.
                    </a> <span id="typeformintegrationbestpractices"></span>
                  </li>
                  <li>
                    You must already have an existing account to connect to
                    HubSpot. If you don’t have one, you can refer{" "}
                    <a
                      href="https://knowledge.hubspot.com/get-started/set-up-your-account"
                      target={"_blank"}
                    >
                      here.
                    </a>
                  </li>
                </ul>
              </p>
            </section>
            <section id="typeformintegrationbestpractices">
              <p>
                <h1 className="d-none">Typeform integration best practices </h1>
                <div className="heading4">Typeform integration best practices</div>
                <b>
                  When integrating ConvertML with Typeform, here are some best
                  practices to follow:
                </b>

                <ul>
                  <li>
                    Make the email ID question mandatory in your survey to be
                    able to match the records between HubSpot and Typeform.{" "}
                  </li>
                  <li>
                    After connecting your Typeform, ConvertML shows you the list
                    of questions and the type of responses for each of them. At
                    this stage, you can choose to deselect questions that you
                    believe may not be necessary for analysis.{" "} 
                  </li>
                  <li>
                    ConvertML supports automation. It’s a good practice to
                    schedule regular updates for Typeform data synchronization
                    based on your preferences, ensuring that your analyses are
                    always up-to-date.<span id="howtodesignyoursurveyforeffectiveanalysis"> </span>
                  </li>
                </ul>
              </p>
            </section>
            <section id="howcanImeasurecustomersatisfaction">
            <h2 className="d-none">How to design your survey for effective analysis </h2>
              <div className="heading4">How to design your survey for effective analysis </div>
              <span  id="responses"></span>
              <p>
                Though ConvertML works on all kinds of forms, designing your
                survey by following the guidelines below can improve the quality
                of the analysis. Here’s how you can design your survey to
                improve your analysis:<br/><br/> 
                <b>Responses </b>
                <ul>
                  <li>
                    Avoid overly long/complex options for multiple-choice
                    questions.{" "}  <span  id="design"></span>
                  </li>
                  <li>
                    Provide a wide range of options so an individual doesn’t
                    feel restricted in their answers. If possible, provide
                    additional text boxes wherever necessary.
                  </li>
                  <li>
                    When providing options, limit to a maximum of 5 or 6.
                    Anything more than this will require additional focus and
                    effort, which we want to avoid.{" "}
                  </li>
                  <li>Again, stay away from technical terms/jargon. </li>
                </ul>{" "}
              </p>
              <b  >Design</b> 
              <p>
                <ul>
                  <li>
                    Use images, icons, and illustrations in your surveys. The
                    survey page has to be visually appealing.{" "}
                  </li>
                  <li>
                    Ensure proper color contrast, text size, and screen reader
                    compatibility. You can also provide tiny buttons that let
                    users customize the font size and theme of the page. Place
                    it such that it doesn’t interfere with the survey itself.
                  </li>
                  <li>
                    Make sure the buttons for navigation and interaction are
                    clearly labeled and easy to tap or click. No one likes
                    spending time figuring out what button does what or why
                    their response isn’t registering.{" "}
                  </li>
                  <li><span  id="incentives"></span>
                    Avoid too many pop-ups or distractions. No one likes them.{" "}
                  </li>
                  <li>
                    Provide a progress bar to track the completion status. Allow
                    users to skip questions.{" "}
                  </li>
                </ul>
                Of course, based on your target group, you can choose to
                experiment with icons, background, font, and your overall theme.{" "}
              </p>
              <b>Incentives</b>
              <ul>
                <li>
                  The incentives you provide must be relevant and relatable to
                  your target group or be universal. Use small, frequent
                  initiatives (don’t give away everything at once) to keep
                  people motivated to complete the survey.{" "}
                </li>
                <li>
                  If you opt for pre-paid rewards, have a system that adds the
                  rewards to a cart that can be accessed upon survey completion.
                  This is to counter scenarios where someone might leave the
                  survey midway through while claiming most of the rewards.<span  id="protip"></span>
                </li>
              </ul>
            </section>
            <section >
              <h3>Pro tip: </h3>
              <p>
                You may incorporate the following questions in your survey to
                make it easier for ConvertML to perform NPS, CSAT, and BL
                analysis:{" "}
              </p>
              <p>
                <b>Net Promoter Score (NPS):</b>
                <br />
                "On a scale of 0 to 10, how likely are you to recommend our
                product/service to a friend or colleague?"
                <br />
                Response Scale: 0 (Not Likely) to 10 (Very Likely)
              </p>
<span  id="hubSpotintegrationbestpractices"></span>
              <p>
                <b>Customer Satisfaction Score (CSAT):</b>
                <br />
                "How satisfied were you with [product/service]?"
                <br />
                Response Scale: 1 (Very Unsatisfied) to 5 (Very Satisfied)
              </p>
              <p>
                <b>Brand Loyalty Analysis:</b>
                <br />
                "How likely are you to continue using our [product/service] in
                the future?"
                <br />
                Response Scale: 1 (Very Unlikely) to 5 (Very Likely)
              </p>
            </section>
            {/* <section>  <span  id="datamappingbestpractices"></span>
              <h3> HubSpot integration best practices </h3>
            </section> */}
          
            <section  >
              <h3>Data mapping best practices</h3>
              <p>
                Data mapping is a unique feature that ConvertML provides to help
                map each question in your Typeform form to a category and assign
                it a weightage. The weightage is editable.{" "}
              </p>
              <p>
                ConvertML enables you to assign weightage to each question in a
                form based on how important you think they are for your use
                case.{" "}
              </p>
              <p>
                You may also choose to add a custom category and weightage for a
                question based on your business use case. This mapping helps
                ConvertML prioritize the variables to analyze in the case of
                CSAT, NPS, or Brand Loyalty.{" "}
              </p>
              <p>How does data mapping work? </p>
              <p>ConvertML does data mapping by </p>
              <p>
                <b>Categorizing for clarity:</b> Each question from your
                Typeform is matched with a category that reflects an aspect of
                your brand, like "Brand Alignment" or "Value for Money." You can
                also add a new category of your own if the existing ones don’t
                align with your use case.
              </p>
              <p>
                <b>Assigning weightage:</b> ConvertML smartly assigns weight to
                each question based on the type of analysis and its relevance to
                it. But ConvertML lets you modify the weight of each question
                suited to your business case.{" "}
              </p>
              <p>For example, in the above image:</p>
              <span  id="analysisCSATNPSBrandloyalty"></span>
              <p>
                "I strongly prefer this brand to others" might be a key
                indicator of customer loyalty, so you assign a significant
                weightage to it under the category <b>"Brand Alignment."</b>
                "This brand can make my life easier" reflects practical benefits
                and could influence a customer's daily preference, so it’s
                mapped to <b>"Value for Money"</b> with a weightage that matches
                your focus on product utility.
              </p>
            </section>
            <section id="analysisCSATNPSBrandloyalty">
              <h3>Analysis - CSAT, NPS, Brand loyalty</h3>
              <p>ConvertML filters</p>
              <p>
                <b>Dashboard level filters</b>
                <div class="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Filter Number</th>
                      <th>Filter Name</th>
                      <th>Your Options</th>
                      <th>What You Can Do</th>
                      <th>Default Setting</th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> 1</td>
                      <td>Time Frame </td>
                      <td>Quarterly, Yearly, Monthly, Custom Period </td>
                      <td>Select the period you want to analyze. </td>
                      <td>None </td>{" "}
                      <td>
                        If your selected period has no data, you'll receive a
                        notification.{" "}
                      </td>
                    </tr>
                    <tr>
                      <td> 2</td>
                      <td>Tracking Variables</td>
                      <td> Customer Satisfaction, Price Loyalty, etc.</td>
                      <td>
                        {" "}
                        Choose one or more key variables to track and analyze
                        over time.
                      </td>
                      <td> None</td>{" "}
                      <td>
                        You can select multiple to see how they correlate.
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Demographic Selection</td>
                      <td>
                        Region, Customer Segment, Age, Gender, Location, Other
                        with specific options (e.g., North, South, Age groups)
                      </td>
                      <td>
                        Pick demographic metrics and specify the categories
                        relevant to your analysis.
                      </td>
                      <td>None</td>{" "}
                      <td>
                        If you select multiple demographics, you'll be able to
                        specify categories for each.
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Analysis Features</td>
                      <td>Forecasting, Cumulative Analysis, Moving Average</td>
                      <td>
                        Engage advanced analysis features to identify trends and
                        patterns.
                      </td>
                      <td>None</td>{" "}
                      <td>We can add more features to this list as needed.</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Sliding Bar</td>
                      <td>Numerical Categorization</td>
                      <td>
                        A slider to set numerical range (e.g., Customer
                        Satisfaction scores).
                      </td>
                      <td>
                        Fine-tune the data displayed based on numerical values
                        of interest to you.
                      </td>
                      <td>None. </td>
                    </tr>
                  </tbody>
                </table>
</div>
              
                <span  id="npsanalysis"></span>
                <br />
                Here are some filters that you can use to get both overall and
                drilled-down view of your customers:{" "}
              </p>
            </section>
            <section id="selectanalysis">  <span  id="howcanImeasureNPS"></span>
                <h3>NPS analysis </h3>
                <p>Net Promoter Score (NPS) is like asking your customers, "On a scale of 0-10, how likely are you to recommend our product/service to a friend or colleague?" It’s a straightforward way to measure how much your customers like what you’re offering and if they’d vouch for it. </p>
                </section>
                <section><span  id="howcanImeasureNPS"></span> <span  id="whatifImnotcapturingthisinformationnlp"></span>
                <h3>How can I measure NPS?  </h3>
                <p>Start by asking your customers the golden NPS question: "On a scale of 0 to 10, how likely are you to recommend our product/service to a friend or colleague?" This simple question will set the stage for your NPS measurement.</p>
                </section>
                <section>
                <h3>What if I’m not capturing this information?  </h3>
                <p>If you don’t have an NPS survey but have HubSpot records, you can define rules within ConvertML to interpret various behaviors and feedback as indicative of customer loyalty. You’ll have to decide which behaviors and interactions from your data (here, HubSpot) are indicative of customer loyalty. For instance: </p>
                <p>
                    <ul>
                        <li>High email open and click-through rates might imply customer engagement.</li><li>
Multiple interactions with customer service could signal potential issues, affecting the NPS negatively if the interactions are complaints.
</li>
                    </ul><p>
                    ConvertML applies your custom logic to estimate NPS. For example:</p>
                    <ul>
                        <li>If a customer has a high engagement score based on email interactions, they might be classified as a Promoter.</li>
                        <li>A customer with a recent purchase but no engagement might be considered Passive.</li>
                        <li>Multiple support tickets without resolution could classify a customer as a Detractor.</li>
                    </ul>
                </p><span  id="howdoesConvertMLperform"></span>
                <p>ConvertML then calculates the NPS based on the above logic for the analysis. </p>
                </section>
                <section>
                <h3>How does ConvertML perform NPS analysis? </h3>
                <p>Here’s how ConvertML performs NPS analysis: </p>
                <p><b>Choose the time period:</b> With ConvertML, you can check out your NPS at different times. Curious if that big sale or the new feature you launched has changed how likely customers are to recommend you? You can find out.</p>
                <p><b>What factors are making it likely or unlikely for recommendation:</b>Is it the user-friendly design of your software, or maybe your top-notch customer service? With ConvertML, you can break down the NPS by different parts of your business. It helps you see what’s really making your customers want to tell their friends about you. </p><span  id="csatanalysis"></span>
                <p><b>Identify your promoters, passives, and detractors:</b> It’s useful to see which groups of people are your biggest fans (Promoters) and who might not be as impressed (Detractors). And of course the Passives, the ones on the fence that you must pay extra attention to. Maybe younger users love your app, but older users find it tricky? ConvertML lets you dive into these details.</p>
                </section>

                <section id="selectanalysis">
                <h3>CSAT analysis  </h3>
                <p>CSAT is a survey metric to help you measure customers' satisfaction with a specific aspect of a product or service. This can vary depending on your business case. For example, if you’re a SaaS company, you might want to measure customer satisfaction against different facets of your business such as issue resolution time, product quality, UI, etc. to understand the areas that you’ll want to focus on to improve customer satisfaction. You might also want to measure customer satisfaction across different time periods, demographics, etc. The examples below can help you understand better: </p>
                <p>Example 1<br/>
               <b> Aspect:</b> Issue Resolution Time<br/>
               <b>Situation:</b> You introduce a new customer service protocol to enhance efficiency.<br/>
               <b>CSAT Question:</b> “How satisfied are you with the time taken to resolve your recent support issue?”<br/>
               <b>Analysis: </b>After implementing the new protocol, you observe an increase in CSAT scores from an average of 3.2 to 4.5, indicating that customers appreciate the quicker resolution time. 
                </p>
                <p>Example 2<br/>
               <b> Aspect:</b> Software Update Satisfaction<br/><span  id="howcanImeasurecustomersatisfaction"></span>
               <b>Situation:</b>  As a SaaS company, you've been releasing updates over the year and tracking CSAT scores to gauge customer satisfaction.<br/>
               <b>Initial Release:</b> After the initial release, the CSAT score averages around 3.5. Customers like the new features but report some bugs.<br/>
               <b>First Update:</b>After an update addressing these bugs, the CSAT score improves to 4.0, showing customer appreciation for the quick fixes.<br/>
               <b>Subsequent Updates:</b>With each following update, focusing on adding innovative features and refining existing ones, you observe a gradual increase in CSAT scores, reaching around 4.4 by the end of the year.<br/>
               <b>Analysis: </b>This upward trend in CSAT scores over time reflects the positive impact of your responsive and customer-focused update strategy.<br/>
                </p>
                </section>

                <section id="selectanalysis">
                <h3>How can I measure customer satisfaction?  </h3> <span  id="whatifImnotcapturingthisinformation"></span>
<p>You can extend the same for the parameters that you’re tracking for your business. For this analysis, you’ll need to capture the customer satisfaction score for each of your customers. You can do this by asking a simple question like, “How satisfied were you with [product/service]?” The responses are often given on a scale, for example, 1 to 5, where 1 could be 'Very Unsatisfied' and 5 'Very Satisfied'. ConvertML then uses this metric to perform the CSAT analysis. </p>
                </section>

                <section id="selectanalysis">
                <h3>What if I’m not capturing this information?  </h3><span  id="howdoesConvertMLperformCSATanalysis"></span>
<p>ConvertML uses internal logic to derive the variable for you based on your business logic. For example, if you have ratings or feedback given for specific transactions, ConvertML can aggregate these to derive customer satisfaction. Or if you’d like to use NPS scores to derive customer satisfaction, that’d work, too. For instance, high NPS scores (typically scores from 9-10) fall under high customer satisfaction, while lower scores (0-6) might indicate dissatisfaction. </p>
                </section>

                <section id="selectanalysis">
                <h3>How does ConvertML perform CSAT analysis?  </h3>
<p><b>Pick the perfect time to check:</b> With ConvertML, you get to see how happy your customers are at different times. Did that new feature you added last month make your customers happier? </p>
<p><b>Find out what features your customers love the most:</b> Is it your lightning-fast customer service or the cool new updates to your app? With ConvertML, you can choose different parts of your business to see exactly what's making your customers happy. It's like having a happiness detective on your team.</p>
<p><b>Who's happy and who's not:</b> It's great to know if certain groups, maybe users from a specific region, are really interested in your product while a different group isn’t. ConvertML lets you start zooming in and out of specific groups.  </p><span  id="brandLoyaltyAnalysis"></span>
<p>With this level of granularity, you can adjust your marketing campaigns with contact-level precision! You’ll know exactly when a feature failed to impress your customers or if a specific demographic has problems with the recent update. </p>
                </section>

                <section id="selectanalysis">
                <h3>Brand Loyalty Analysis  </h3>
<p>Brand loyalty (BL) is about how strongly your customers feel connected to your brand. It's a measure of their likelihood to continue choosing your services over competitors. Similar to CSAT, measuring BL across different variables such as product usage, pricing, UI, etc. can help you figure out the best way to retain your customers. You can also measure BL across different time periods, demographics, etc. Let’s take a look at an example to understand this: </p>
<p><b>Aspect:</b> Loyalty to your subscription service</p>
<p><b>Situation:</b> You've got a monthly subscription service and want to see how loyal your customers are.
</p><span  id="howdoImeasureBrandloyalty"></span>
<p><b>BL Question:</b> Something like, “How likely are you to continue using our service instead of switching to another?”</p>
<p><b>Analysis:</b> You notice that after adding more perks to your subscription, your BL scores go up from “Maybe I'll stay” to “I'm not going anywhere.” This tells you that the new perks are a hit, and your customers aren't keen on leaving.</p> 
                </section>

                <section >
                <h3>How do I measure Brand loyalty?   </h3> <span  id="howdoImeasureBrandloyalty"></span> <span  id="whatifImnotcapturingthisinformationbl"></span>
                <p>To measure Brand Loyalty among your customers, start by framing a straightforward question that directly captures their loyalty sentiment. For instance, you might ask, “How likely are you to continue using our [product/service] in the future?” The response scale could be similar to CSAT, such as 1 to 5, where 1 represents 'Very Unlikely' (indicating low loyalty), and 5 represents 'Very Likely' (indicating high loyalty).</p> 
                </section>
                <section id="selectanalysis">
                <h3>What if I’m not capturing this information?   </h3> <span  id="howdoesConvertMLperformbrandloyaltyanalysis"></span>
                <p>If you don’t have a variable that captures the information, ConvertML can derive it for you based on the specific business logic you provide. For example, let’s say you’ve captured the “Likelihood to Suggest” or NPS score in your survey, and you want to use the same for deriving BL. ConvertML takes these criteria and applies them to your customer data, automatically categorizing each customer's loyalty level as “Very High,” “High,” “Moderate,” “Low,” or “Very Low” according to the scores they've given.</p> 
                </section>

                <section id="selectanalysis">
                <h3>How does ConvertML perform brand loyalty analysis?    </h3> 
                <p><b>Choose when to look: </b>Just like with CSAT scores, you can see how loyal your customers are over different times. You might want to see if a recent marketing event you launched changed how people feel about sticking with you.</p> 
                <p><b>What’s making them stick around: </b>You can pick different parts of your business, like how easy your app is to use or how your customer service is, and see if that’s making people more likely to stay loyal.</p><span  id="textualanalysis"></span>
                <p><b>Who are your loyal customers:</b>You can get an idea of which certain groups of people, like younger users or people from different places, are impressed with your brand. You can start with everyone and then choose specific groups to focus on. Zoom in and zoom out seamlessly. </p>
                <p>Knowing your loyalty scores in these different ways helps you figure out what to do next. If something's making people stick with you, do more of that. Watching how these scores change over time lets you catch what’s working and what’s not so you can adapt quickly! When you understand who’s really into your brand and why, you can make things even better for them.</p>
                </section>

                <section id="selectanalysis">
                <h3>Textual analysis </h3> 
<p>ConvertML can also analyze textual feedback to extract sentiments, providing a more comprehensive understanding of your customers. It can process your text data to perform sentiment analysis, identifying key themes and emotions in customer responses. This analysis is particularly valuable as it uncovers the 'why' behind the satisfaction scores. </p>
<p>This is only possible when you have free-flowing textual data. It’s a great practice to include a text box in your survey just below the scores, so customers get a chance to elaborate on why they feel a certain way.</p> 
<p><b>How does ConvertML analyze textual information? </b><br/>ConvertML can create dynamic word clouds that <b>visually represent</b> the most frequently mentioned words in customer feedback. You can choose what you want to view: single-word phrases, two-phrases, three-phrases, or more. You can also use filters just like above to view popular words/phrases for different age groups, regions, ages, etc. Imagine a scenario where your customer base (b/w the ages of 18 and 25) has a problem with the recent update you made. ConvertML’s word cloud, when filtered to this, might show: “Bad update”, “Slow UI” and more. </p>

<p>Or you may be curious as to what your customers from different regions think of the UI update. When filtered ConvertML’s word cloud might reveal that in urban areas, phrases like “streaming quality” and “variety of genres” are common, while in rural areas, “app accessibility” and “affordable plans” stand out.</p>
<span  id="dataupload"></span>
<p>This, when combined with your quantitative insights (from above), gives you a 360-degree view of your customers. Get the what, how, and “why” of customers. </p>
                </section>

                {/* <section>
                <h3>Data upload </h3> 

                </section> 
            <br />*/}
            <br />
            <br />
          </Grid>
        </Grid>
      </div>

      <HomeFooter />
    </>
  );
}

export default ConvertMLUserGuidePage;
