import { useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { IPage } from '../../interfaces/page.interface';
import '../../styles/pagination.css';
import Loading from '../../components/common/loading';
import appConfig from '../../config/app-config';
import { Status } from '../../interfaces/status.enum';
import IHorseDto from '../../interfaces/horse.interface';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHorse } from '../../app/services/horse';

const HorseListPage: FC<IPage> = () => {
  const dispatch = useAppDispatch();
  const { horses, status } = useAppSelector((state) => state.horse);
  const [pageNumber, setPageNumber] = useState(0);
  const recordPerPage = appConfig.pagination.recordPerPage;
  const pagesVisited = pageNumber * recordPerPage;
  const pageCount = horses ? Math.ceil(horses.length / recordPerPage) : 0;

  useEffect(() => {
    if (Status.INIT === status) dispatch(fetchHorse());
  }, [status, dispatch]);

  const displayRecords = (horses: IHorseDto[]) =>
    horses.slice(pagesVisited, pagesVisited + recordPerPage).map((horse: IHorseDto) => (
      <li className={'list-group-item '} key={horse.id}>
        <Link to={`horse/${horse.id}`}>{horse.name} </Link>
      </li>
    ));

  const changePage = (selectedItem: { selected: number }): void => {
    setPageNumber(selectedItem.selected);
  };

  const pagination = (horses: IHorseDto[]) => {
    if (horses?.length > recordPerPage) {
      return (
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={changePage}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          containerClassName="paginationBttns"
          previousLinkClassName="previousBttn"
          nextLinkClassName="nextBttn"
          disabledClassName="paginationDisabled"
          activeClassName="paginationActive"
        />
      );
    }
  };

  if (Status.LOADING === status) {
    return <Loading />;
  }

  return (
    <>
      <h2>Horse List </h2>

      <ul className="list-group">{horses && displayRecords(horses)}</ul>
      {horses && pagination(horses)}
    </>
  );
};

export default HorseListPage;
