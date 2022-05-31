function requireRoutes(routes) {
  const handlers = {};
  const apis = Object.keys(routes);

  apis.forEach(apiName => {

    const api = routes[apiName];

    handlers[apiName] = api.routes.map((e, i) => {
      const url = e.replace(/.*davidsdevel-/, '/api/').replace('s/api', '').replace(/\/app\//, '');

      return {
        url,
        file: api.files[i]
      };
    });
  });

  return handlers;
}

module.exports = requireRoutes;
