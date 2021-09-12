import IRoute from '../interfaces/routes.interface';
import HorseListPage from '../features/horses/horse-list.page';
import HorseDetailPage from '../features/horses/horse-detail.page';

const routes: IRoute[] = [
  {
    path: ['/', '/horses'],
    name: 'horse',
    component: HorseListPage,
    exact: true,
  },
  {
    path: ['/horse/:horseId'],
    name: 'horseDetails',
    component: HorseDetailPage,
    exact: true,
  },
];

export default routes;
