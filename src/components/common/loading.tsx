import { FC } from 'react';

import { IPage } from '../../interfaces/page.interface';

const Loading: FC<IPage> = () => {
  return (
    <div className="text-center">
      <div className="spinner-border " role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Loading;
