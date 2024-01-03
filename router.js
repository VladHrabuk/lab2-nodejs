function Router() {
  const routes = new Map();

  function createRoute(url, method, controller) {
    const key = method.toUpperCase() + url;
    routes.set(key, controller);
  }

  function getHandler(url, method) {
    const key = method.toUpperCase() + url;
    return routes.get(key);
  }

  return {
    createRoute,
    getHandler,
  };
}

export const router = Router();
