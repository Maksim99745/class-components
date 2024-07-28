import { router } from './router';

describe('router Component', () => {
  it('router is exist', async () => {
    assert.exists(router);
  });
  it('should have a route for the main page', () => {
    const mainPageRoute = router.routes.find((route) => route.path === '/');
    assert.exists(mainPageRoute, 'Main page route should be defined');
  });
  it('should have a route for character details', () => {
    const mainPageRoute = router.routes.find((route) => route.path === '/');
    const detailsRoute = mainPageRoute?.children?.find((child) => child.path === 'details/:characterName');
    assert.exists(detailsRoute, 'Character details route should be defined');
  });
  it('should have a route for 404 explicitly', () => {
    const notFoundExplicitRoute = router.routes.find((route) => route.path === '/404');
    assert.exists(notFoundExplicitRoute, 'Explicit 404 route should be defined');
  });
  it('should have a catch-all route for 404 pages', () => {
    const notFoundRoute = router.routes.find((route) => route.path === '*');
    assert.exists(notFoundRoute, 'Catch-all route for 404 pages should be defined');
  });
});
