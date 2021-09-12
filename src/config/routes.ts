import IRoute from '../interfaces/routes.interface';
import HorseListPage from '../features/horses/horse-list.page';
import HorseDetailPage from '../features/horses/horse-detail.page';
import EditHorseFormPage from '../features/horses/edit-horse-form.page';

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
  {
    path: ['/editHorse/:horseId'],
    name: 'editHorseDetails',
    component: EditHorseFormPage,
    exact: true,
  },
];

export default routes;
