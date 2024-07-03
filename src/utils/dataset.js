const datasetCreate = async ({
  user,
  title,
  description,
  dataClassification,
  dataTerritory,
  dataFrequency,
  dataFormat,
  dataSize,
  tags,
  dataType,
  dataSource,
}) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/dataset/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        user,
        title,
        description,
        dataClassification,
        dataTerritory,
        dataFrequency,
        dataFormat,
        dataSize,
        tags,
        dataType,
        dataSource,
      }),
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
