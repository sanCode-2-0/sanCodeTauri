import { css } from '@emotion/react';
import { PacmanLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <PacmanLoader color={'#36D7B7'} css={override} size={25} />
            <p>Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
