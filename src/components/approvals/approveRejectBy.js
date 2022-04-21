import React from 'react';
import Typography from 'britive-design-system/core/components/typography';

export const approveRejectBy = (label, string, outerClass, innerClass) => {
  return (
    <div className={outerClass}>
      <Typography variant="label2"> {label} </Typography>
      <div className={innerClass}>
        <Typography variant="label1">{string}</Typography>
      </div>
    </div>
  );
};
