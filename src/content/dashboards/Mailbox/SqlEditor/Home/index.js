import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Navbar from "../../../../components/SqlEditor/Navbar";
import SideBar from "../../../../components/SqlEditor/SideBar";
import Playground from "../PlayGround";
import useAppContext from "../../../../hooks/SqlEditor/useAppContext";
import HomePageLayout from "../../../../layouts/SqlEditor/index";
import { getTablesMockData } from "../../../../utils/SqlEditor/mockData";
import { SessionContext } from "../../../../contexts/SessionContext";
/**
 * Home Component
 *
 * Can have routing logic to render different Layouts/pages
 * for different routes,  devices etc.
 */
const Home = () => {
  // Sidebar State to toggle drawer
  const [showDrawer, setShowDrawer] = useState(false);
  const [session, ,] = useContext(SessionContext);
  const { user } = session;
  const toggleDrawerState = useCallback(() => {
    setShowDrawer((show) => !show);
  }, [setShowDrawer]);

  // hook to fetch data from context

  const { tablesData, setTablesData } = useAppContext();

  useEffect(() => {

    console.log("");
    getTablesMockData(user._id).then((data) => {
      setTablesData(data);
      setShowDrawer(true);
    });
  }, []);

  const sideBarItems = useMemo(
    () =>
      Object.keys(tablesData).map(
        (tableName) => tablesData[tableName].metaData
      ),
    [tablesData]
  );

  return (
    sideBarItems && (
      <HomePageLayout
        navBar={<Navbar onMenuButtonClick={toggleDrawerState} />}
        sideBar={<SideBar showDrawer={showDrawer} items={sideBarItems} />}
      >
        <Playground />
      </HomePageLayout>
    )
  );
};

export default Home;
