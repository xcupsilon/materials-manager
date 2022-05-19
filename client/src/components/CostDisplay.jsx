import React from 'react';

const CostDisplay = ({ matVolume, matCost }) => (
  <div className="flex justify-between w-[17rem] text-text mt-[1.5rem]">
    <div>
      Total Cost:
    </div>
    <div>
      ${(matCost * matVolume).toFixed(2)}
    </div>
  </div>
)

export default CostDisplay