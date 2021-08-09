import React, { CSSProperties } from "react";

interface Props extends React.TdHTMLAttributes<HTMLElement> {}

export const Cell: React.FC<Props> = ({ children, style, ...props }) => {
  return (
    <td
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
    </td>
  );
};
