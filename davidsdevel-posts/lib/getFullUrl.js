const getFullUrl = (url, urlID, data, _base = '') => {
  const base = `/${_base}`;

  if (urlID == '1')
    return `${base}/${url}`;

  if (urlID == '2')
    return `${base}/${data.category}/${url}`;

  const year = data.published.getFullYear();
  const month = data.published.getMonth() + 1;

  if (urlID == '3')
    return `${base}/${year}/${month}/${url}`;

  const date = data.published.getDate();

  return `${base}/${year}/${month}/${date}/${url}`;
};

module.exports = getFullUrl;
