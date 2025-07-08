const updateHandling = {
  setQuery: (fields) => {
    const fieldNames = Object.keys(fields);
    const setQuery = fieldNames
      .map((field, index) => `${field} = $${index + 2}`)
      .join(", ");
    console.log("SETQUERY", setQuery);
    return setQuery;
  },
  values: (id, fields) => {
    const fieldNames = Object.keys(fields);
    const values = [id, ...fieldNames.map((field) => fields[field])];
    console.log("values", values);

    return values;
  },
};

export default updateHandling;
