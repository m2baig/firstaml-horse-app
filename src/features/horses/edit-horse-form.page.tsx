import React, { useEffect, FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { IPage } from '../../interfaces/page.interface';
import IHorseDto from '../../interfaces/horse.interface';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHorseById, updateHorseById } from '../../app/services/horse';

import { selectedHorseById, selectHorseById } from './horses.slice';
import Loading from '../../components/common/loading';

const EditHorseFormPage: FC<IPage> = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { horseId }: { horseId: string } = useParams();
  const horse = useAppSelector((state) => selectHorseById(state, horseId));
  const selectedHorse = useAppSelector((state) => selectedHorseById(state));

  useEffect(() => {
    if (!horse) dispatch(fetchHorseById(horseId));
  }, [horse, horseId, dispatch]);

  const horseDetails = horse ? horse : selectedHorse;
  console.log(horseDetails);

  const [name = '', setTitle] = useState(horseDetails?.name);
  const [favouriteFood = '', setFood] = useState(horseDetails?.profile?.favouriteFood);
  const [height = '', setHeight] = useState(horseDetails?.profile?.physical.height);
  const [weight = '', setWeight] = useState(horseDetails?.profile?.physical?.weight);
  const [error, setError] = useState(false);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onFoodChanged = (e: React.ChangeEvent<HTMLInputElement>) => setFood(e.target.value);
  const onHeightChanged = (e: React.ChangeEvent<HTMLInputElement>) => setHeight(parseInt(e.target.value));
  const onWeightChanged = (e: React.ChangeEvent<HTMLInputElement>) => setWeight(parseInt(e.target.value));
  const onSavePostClicked = () => {
    if (name && name.trim()) {
      const newHorse = {
        id: horseId,
        name,
        profile: {
          favouriteFood,
          physical: {
            height: height,
            weight: weight,
          },
        },
      };
      dispatch(updateHorseById(newHorse as IHorseDto));
      history.push(`/horse/${horseId}`);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!horseDetails) {
    return <Loading />;
  }
  return (
    <>
      <h2>Edit Horse </h2>
      <section>
        <form>
          <div className={`form-group ${error ? 'has-error' : ''}`}>
            <label htmlFor="name">Horse name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Horse Name"
              defaultValue={name}
              onBlur={onTitleChanged}
              required
            />
            {error ? <div className="color-error  mt-2">Horse name is required.</div> : ''}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="favouriteFood">Favourite Food</label>
            <input
              type="text"
              className="form-control"
              id="favouriteFood"
              placeholder="Enter Favourite Food"
              defaultValue={favouriteFood}
              onBlur={onFoodChanged}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="height">Horse Height</label>
            <input
              type="text"
              className="form-control"
              id="height"
              placeholder="Enter Horse Height"
              defaultValue={height}
              onBlur={onHeightChanged}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="weight">Horse Weight</label>
            <input
              type="text"
              className="form-control"
              id="weight"
              placeholder="Enter Horse Weight"
              defaultValue={weight}
              onBlur={onWeightChanged}
            />
          </div>
          <button type="button" onClick={onSavePostClicked} className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default EditHorseFormPage;
