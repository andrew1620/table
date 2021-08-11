import React from "react";
import { Button } from "../../common/Button";

interface Props {
  onClick: () => void;
}
export const FilterButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button onClick={onClick} icon={"filter.svg"}>
      filter
    </Button>
  );
};
