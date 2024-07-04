import { Box, Card, Container, Link, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import DataSourceForm from "./DataSourceForm";
const Content = styled(Box)(
  () => `
    display: flex;
    flex: 1;
    width: 100%;
`
);

function DatasetForm() {
  const { t } = useTranslation();

  return (
    <>
      <Content>
        <Container maxWidth="lg">
          <Card
            sx={{
              p: 4,
              my: 4,
            }}
          >
            <Box textAlign="center">
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                }}
              >
                {t("Data Source")}
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 3,
                }}
              >
                {t("Fill in the fields below to create a data source.")}
              </Typography>
            </Box>
            <DataSourceForm />
          </Card>
        </Container>
      </Content>
    </>
  );
}

export default DatasetForm;
