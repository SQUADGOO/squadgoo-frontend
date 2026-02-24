import { sidebarStructure } from './navigation';

export const routes = [
  { path: '/', redirect: '/dashboard-overview' },
  ...sidebarStructure.flatMap(section => 
    section.submenus.map(submenu => ({
      path: `/${submenu.id}`,
      component: submenu.id,
      section: section.id,
      title: submenu.title
    }))
  )
];

export const getRouteById = (id) => routes.find(r => r.path === `/${id}`);

export const getRoutesBySection = (sectionId) => 
  routes.filter(r => r.section === sectionId);

export default routes;
