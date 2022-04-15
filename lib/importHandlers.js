const {join} = require('path')

function requireRoutes(routes) {
  const handlers = {};
  const apis = Object.keys(routes);

  apis.forEach(apiName => {
    
    const api = routes[apiName];

    api.routes.forEach((e, i) => {
      let newRoute = e.replace(/.*davidsdevel-/, '/api/').replace('s/api', '').replace(/\/app\//, '');
      
      if (process.env.NODE_ENV !== 'production')
        newRoute = newRoute.split('/a/api')[1];
      
      handlers[newRoute] = require(join(api.files[i]))
    });
  });

  return handlers;
}

module.exports = requireRoutes;
