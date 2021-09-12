import { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';

import { IPage } from '../../interfaces/page.interface';
import IHorseDto from '../../interfaces/horse.interface';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHorseById } from '../../app/services/horse';

import { selectedHorseById, selectHorseById } from './horses.slice';
import Loading from '../../components/common/loading';

const HorseDetailPage: FC<IPage> = () => {
  const { horseId }: { horseId: string } = useParams();
  const dispatch = useAppDispatch();
  const horse = useAppSelector((state) => selectHorseById(state, horseId));
  const selectedHorse = useAppSelector((state) => selectedHorseById(state));

  useEffect(() => {
    if (!horse) dispatch(fetchHorseById(horseId));
  }, [horse, horseId, dispatch]);

  const displayRecords = (horse: IHorseDto) => {
    return (
      <>
        <div className="container">
          <div className="row border p-1">
            <div className="col-sm">Name:</div>
            <div className="col-sm">{horse.name}</div>
          </div>
          <div className="row border p-1">
            <div className="col-sm">Favourite Food:</div>
            <div className="col-sm">{horse?.profile?.favouriteFood}</div>
          </div>
          <div className="row border p-1">
            <div className="col-sm">Height:</div>
            <div className="col-sm">{horse?.profile?.physical?.height}</div>
          </div>
          <div className="row border p-1">
            <div className="col-sm">Weight:</div>
            <div className="col-sm">{horse.profile?.physical?.weight}</div>
          </div>
        </div>
      </>
    );
  };
  const horseDetails = horse ? horse : selectedHorse;

  if (!horseDetails) {
    return <Loading />;
  }

  return (
    <>
      <h2>Horse Details </h2>
      {horseDetails && displayRecords(horseDetails)}
    </>
  );
};

export default HorseDetailPage;
