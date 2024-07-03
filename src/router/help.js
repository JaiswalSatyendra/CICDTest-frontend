import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

import SuspenseLoader from "../components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Docs

const Introduction = Loader(lazy(() => import("../content/help/Introduction")));
const Authentication = Loader(
  lazy(() => import("../content/help/Authentication"))
);
const Changelog = Loader(lazy(() => import("../content/help/Changelog")));
const ContactSupport = Loader(
  lazy(() => import("../content/help/ContactSupport"))
);
const Dependencies = Loader(lazy(() => import("../content/help/Dependencies")));
const Installation = Loader(lazy(() => import("../content/help/Installation")));
const Internationalization = Loader(
  lazy(() => import("../content/help/Internationalization"))
);
const Routing = Loader(lazy(() => import("../content/help/Routing")));
const RtlLayout = Loader(lazy(() => import("../content/help/RtlLayout")));
const ApiRequests = Loader(lazy(() => import("../content/help/ApiRequests")));
const ThemesCustomization = Loader(
  lazy(() => import("../content/help/ThemesCustomization"))
);

const helpRoutes = [
  {
    path: "",
    element: <Navigate to="/help/introduction" replace />,
  },
  {
    path: "introduction",
    element: <Introduction />,
  },
  {
    path: "authentication",
    element: <Authentication />,
  },
  {
    path: "changelog",
    element: <Changelog />,
  },
  {
    path: "contact-support",
    element: <ContactSupport />,
  },
  {
    path: "dependencies",
    element: <Dependencies />,
  },
  {
    path: "installation",
    element: <Installation />,
  },
  {
    path: "internationalization",
    element: <Internationalization />,
  },
  {
    path: "routing",
    element: <Routing />,
  },
  {
    path: "rtl-layout",
    element: <RtlLayout />,
  },
  {
    path: "api-requests",
    element: <ApiRequests />,
  },
  {
    path: "themes-customization",
    element: <ThemesCustomization />,
  },
];

export default helpRoutes;
