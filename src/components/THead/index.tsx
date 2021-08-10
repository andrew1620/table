import React from "react";

interface Props extends React.TdHTMLAttributes<HTMLElement> {}

export const THead: React.FC<Props> = ({ children, style, ...props }) => {
  return (
    <th
      style={{
        borderBottom: "1px solid red",
        padding: "10px",
        border: "1px solid green",
        textAlign: "left",
        ...style,
      }}
      {...props}
    >
      {children}
    </th>
  );
};
