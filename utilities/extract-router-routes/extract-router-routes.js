const extractRouterRoutes = router =>
  router.stack.map(route => {
    return { path: route.route.path, method: route.route.stack[0].method };
  });

module.exports = extractRouterRoutes;
