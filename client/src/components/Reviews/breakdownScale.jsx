import React from 'react';

const ScaleBreakdown = (props) => {

  return (
    <div>
      {Object.keys(props.scale).map((characteristic) =>
        <div>{characteristic} Scale: {Number(props.scale[characteristic].value).toFixed(1)}</div>
      )}
    </div>
  );
}

export default ScaleBreakdown;
