import { FC } from 'react';
import Button from '@mui/material/Button';

const NotFound: FC = () => {
  return (
    <div>
      <h1>404 Page Error</h1>

      <p>Page Not Found</p>
      <div>
        <Button size="small" variant="outlined" href="/">
          Back to home page
        </Button>
      </div>
      <section>
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
    </div>
  );
};

export default NotFound;
