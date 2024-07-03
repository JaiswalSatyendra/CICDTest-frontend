import axios from "axios";

export const getTablesMockData = async (userId) => {
  const databaseName = userId;
  const result = {};
  let tableRes = await axios.post(
    `${process.env.REACT_APP_API_URL}/athena/tables`,
    {
      databaseName: databaseName,
    }
  );
  if (tableRes.data.data.statusCode === 200) {
    tableRes = JSON.parse(tableRes.data.data.result);

    const datasetRes = await getUserDatasets(userId);
    let userDatasets = datasetRes.data.data;

    if (tableRes.TableMetadataList) {
      tableRes.TableMetadataList.forEach((table) => {
        result[table.Name] = {
          metaData: {
            tableName: table.Name,
            aliasName: userDatasets.find(
              (dataset) => dataset._id === table.Name.split("_")[0]
            ).title,
            columns: table.Columns.map((column) => {
              return {
                name: column.Name,
                type: column.Type,
              };
            }),
          },
        };
      });
    }
  }
  return result;
};




const getUserDatasets = async (userId) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/dataset/list`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include"
  }).then(res => res.json())
};
