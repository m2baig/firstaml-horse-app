import IRoute from '../interfaces/routes.interface';
import HorseListPage from '../features/horses/horse-list.page';

const routes: IRoute[] = [
  {
    path: ['/', '/horses'],
    name: 'horse',
    component: HorseListPage,
    exact: true,
  },
];

export default routes;
