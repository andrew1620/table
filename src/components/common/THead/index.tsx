import React from "react";
import classes from "./style.module.css";

interface Props extends React.TdHTMLAttributes<HTMLElement> {}

export const THead: React.FC<Props> = ({ children, style, ...props }) => {
  return (
    <th
      className={classes.th}
      style={{
        ...style,
      }}
      {...props}
    >
      <div className={classes.content}>{children}</div>
    </th>
  );
};
