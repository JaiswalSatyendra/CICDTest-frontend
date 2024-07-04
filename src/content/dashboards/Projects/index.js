import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Grid } from "@mui/material";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import useRefMounted from "../../../hooks/useRefMounted";

import PageHeader from "./PageHeader";

import Results from "./Results";

function ManagementProjects() {
  const isMountedRef = useRefMounted();
  const [projects, setProjects] = useState([]);

  const getProjects = useCallback(async () => {
    try {
      // const response = await axios.get("/api/projects");

      if (isMountedRef.current) {
        const projectsData = [
          {
            id: "1",
            name: "Cebus apella",
            screenshot: "/images/placeholders/fitness/1.jpg",
            description:
              "Proin interdum mauris non ligula pellentesque ultrices.",
            tags: ["Software"],
            startDate: 1646746661363,
            dueDate: 1646573861363,
            memberIds: [
              {
                id: "1",
                name: "Lauree MacFadzean",
                avatar: "/images/avatars/1.jpg",
              },
              {
                id: "2",
                name: "Darice Malyon",
                avatar: "/images/avatars/2.jpg",
              },
              {
                id: "3",
                name: "Dwain Culpan",
                avatar: "/images/avatars/3.jpg",
              },
              {
                id: "4",
                name: "Carleton Henric",
                avatar: "/images/avatars/4.jpg",
              },
              {
                id: "5",
                name: "Dillie Considine",
                avatar: "/images/avatars/5.jpg",
              },
            ],
            progress: 56,
            status: "completed",
          },
          {
            id: "2",
            name: "Macropus agilis",
            screenshot: "/images/placeholders/fitness/2.jpg",
            description:
              "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
            tags: ["Backend"],
            startDate: 1646660261363,
            dueDate: 1646401061363,
            memberIds: [
              {
                id: "1",
                name: "Lauree MacFadzean",
                avatar: "/images/avatars/1.jpg",
              },
              {
                id: "3",
                name: "Dwain Culpan",
                avatar: "/images/avatars/3.jpg",
              },
            ],
            progress: 45,
            status: "not_started",
          },
          {
            id: "3",
            name: "Phalacrocorax carbo",
            screenshot: "/images/placeholders/fitness/3.jpg",
            description:
              "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
            tags: ["Development", "Software"],
            startDate: 1646573861363,
            dueDate: 1646487461363,
            memberIds: [
              {
                id: "1",
                name: "Lauree MacFadzean",
                avatar: "/images/avatars/1.jpg",
              },
              {
                id: "5",
                name: "Dillie Considine",
                avatar: "/images/avatars/5.jpg",
              },
            ],
            progress: 35,
            status: "completed",
          },
          {
            id: "4",
            name: "Felis libyca",
            screenshot: "/images/placeholders/fitness/4.jpg",
            description:
              "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
            tags: ["Design Project"],
            startDate: 1646487461363,
            dueDate: 1646141861363,
            memberIds: [
              {
                id: "2",
                name: "Darice Malyon",
                avatar: "/images/avatars/2.jpg",
              },
              {
                id: "4",
                name: "Carleton Henric",
                avatar: "/images/avatars/4.jpg",
              },
              {
                id: "3",
                name: "Dwain Culpan",
                avatar: "/images/avatars/3.jpg",
              },
            ],
            progress: 76,
            status: "in_progress",
          },
          {
            id: "5",
            name: "Nucifraga columbiana",
            screenshot: "/images/placeholders/fitness/1.jpg",
            description:
              "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
            tags: ["UX", "Marketing Research"],
            startDate: 1646401061363,
            dueDate: 1645537061363,
            memberIds: [
              {
                id: "1",
                name: "Lauree MacFadzean",
                avatar: "/images/avatars/1.jpg",
              },
              {
                id: "2",
                name: "Darice Malyon",
                avatar: "/images/avatars/2.jpg",
              },
            ],
            progress: 15,
            status: "in_progress",
          },
          {
            id: "6",
            name: "Drymarchon corias couperi",
            screenshot: "/images/placeholders/fitness/2.jpg",
            description:
              "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
            tags: ["Frontend", "Marketing"],
            startDate: 1646314661363,
            dueDate: 1645796261363,
            memberIds: [
              {
                id: "1",
                name: "Lauree MacFadzean",
                avatar: "/images/avatars/1.jpg",
              },
              {
                id: "2",
                name: "Darice Malyon",
                avatar: "/images/avatars/2.jpg",
              },
              {
                id: "3",
                name: "Dwain Culpan",
                avatar: "/images/avatars/3.jpg",
              },
              {
                id: "4",
                name: "Carleton Henric",
                avatar: "/images/avatars/4.jpg",
              },
              {
                id: "5",
                name: "Dillie Considine",
                avatar: "/images/avatars/5.jpg",
              },
            ],
            progress: 98,
            status: "in_progress",
          },
          {
            id: "7",
            name: "Gazella granti",
            screenshot: "/images/placeholders/fitness/3.jpg",
            description: "Fusce consequat. Nulla nisl. Nunc nisl.",
            tags: ["UX", "React", "Software"],
            startDate: 1646228261363,
            dueDate: 1644932261363,
            memberIds: [
              {
                id: "1",
                name: "Lauree MacFadzean",
                avatar: "/images/avatars/1.jpg",
              },
              {
                id: "3",
                name: "Dwain Culpan",
                avatar: "/images/avatars/3.jpg",
              },
              {
                id: "2",
                name: "Darice Malyon",
                avatar: "/images/avatars/2.jpg",
              },
              {
                id: "5",
                name: "Dillie Considine",
                avatar: "/images/avatars/5.jpg",
              },
            ],
            progress: 76,
            status: "in_progress",
          },
          {
            id: "8",
            name: "Ovis orientalis",
            screenshot: "/images/placeholders/fitness/4.jpg",
            description:
              "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
            tags: ["Angular", "UI", "Frontend"],
            startDate: 1646141861363,
            dueDate: 1641217061363,
            memberIds: [
              {
                id: "3",
                name: "Dwain Culpan",
                avatar: "/images/avatars/3.jpg",
              },
              {
                id: "4",
                name: "Carleton Henric",
                avatar: "/images/avatars/4.jpg",
              },
            ],
            progress: 38,
            status: "not_started",
          },
          {
            id: "9",
            name: "Pseudocheirus peregrinus",
            screenshot: "/images/placeholders/fitness/1.jpg",
            description:
              "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
            tags: ["Design"],
            startDate: 1646055461363,
            dueDate: 1643117861363,
            memberIds: [
              {
                id: "1",
                name: "Lauree MacFadzean",
                avatar: "/images/avatars/1.jpg",
              },
              {
                id: "2",
                name: "Darice Malyon",
                avatar: "/images/avatars/2.jpg",
              },
              {
                id: "5",
                name: "Dillie Considine",
                avatar: "/images/avatars/5.jpg",
              },
            ],
            progress: 93,
            status: "completed",
          },
          {
            id: "10",
            name: "Tiliqua scincoides",
            screenshot: "/images/placeholders/fitness/2.jpg",
            description:
              "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
            tags: ["Frontend", "Software"],
            startDate: 1645969061363,
            dueDate: 1644845861363,
            memberIds: [
              {
                id: "4",
                name: "Carleton Henric",
                avatar: "/images/avatars/4.jpg",
              },
            ],
            progress: 66,
            status: "not_started",
          },
        ];
        setProjects(projectsData);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <>
      <Helmet>
        <title>Projects - Management</title>
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
          <Results projects={projects} />
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementProjects;
