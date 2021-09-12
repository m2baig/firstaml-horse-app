import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IPage } from '../../interfaces/page.interface';
import '../../styles/header.scss';

const Header: FC<IPage> = () => {
  return (
    <nav>
      <section className="content-wrapper">
        <h1>FirstAML App</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Horses</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Header;
