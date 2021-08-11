import React from "react";

interface Props extends React.TdHTMLAttributes<HTMLElement> {}

export const Cell: React.FC<Props> = ({ children, style, ...props }) => {
  return (
    <td
      style={{
        padding: "10px",
        textAlign: "left",
        ...style,
      }}
      {...props}
    >
      {children}
    </td>
  );
};
