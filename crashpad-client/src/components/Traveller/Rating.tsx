import React, { useState } from 'react';
import { Rating, Icon } from '@mui/material';

const StarBorderIcon = () => {
  return (
    <Icon>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 2l2.121 6.485H22l-5.567 4.042L18.779 22l-6.779-4.971L5.221 22l1.566-4.971L2 8.485h7.879L12 2zm0 3.212l-1.879 5.757H4.344l4.544 3.312-1.543 4.897 4.054-2.963 4.042 2.963-1.566-4.897 4.554-3.312H13.88L12 5.212zM12 15l-3.156 2.299.9-2.849-2.344-1.709 3.078-.016.922-2.816.922 2.816 3.078.016-2.344 1.709.9 2.849L12 15z"/>
      </svg>
    </Icon>
  );
};

const StarRating: React.FC = () => {
  const [value, setValue] = useState<number | null>(5);

  return (
    <div>
      <Rating
        name="customized-empty"
        value={value}
        precision={0.1}
        emptyIcon={<StarBorderIcon />}
      />
    </div>
  );
};

export default StarRating;