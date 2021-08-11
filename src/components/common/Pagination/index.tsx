import React from "react";

import { Button } from "../Button";
import { Select } from "../Select";

interface Props {
  current: number;
  total: number;
  perPage: number;
  onChange: (page: number) => void;
}
export const Pagination: React.FC<Props> = ({
  current,
  total,
  perPage,
  onChange,
}) => {
  const pagesNumber = Math.ceil(total / perPage);
  const options = Array.from({ length: pagesNumber }, (item, index) => (
    <option value={index + 1} key={index + 1}>
      {index + 1}
    </option>
  ));

  const isFirstPage = current === 1;
  const isLastPage = current === pagesNumber;

  const prevClick = () => {
    if (!isFirstPage && pagesNumber !== 0) onChange(current - 1);
  };
  const nextClick = () => {
    if (!isLastPage && pagesNumber !== 0) onChange(current + 1);
  };

  return (
    <div style={{ display: "flex" }}>
      <Button onClick={prevClick} disabled={isFirstPage}>
        {"\u003C"}
      </Button>
      <Select
        onChange={(e) => onChange(Number(e.target.value))}
        value={current}
        style={{
          margin: "0 2px",
        }}
      >
        {options}
      </Select>
      <Button onClick={nextClick} disabled={isLastPage}>
        {"\u003E"}
      </Button>
    </div>
  );
};
