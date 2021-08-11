import React from "react";
import classes from "./style.module.css";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: string;
}
const publicUrl = process.env.PUBLIC_URL;
export const Button: React.FC<Props> = ({ children, icon, ...props }) => {
  return (
    <button className={classes.button} {...props}>
      {!icon && children}
      {icon && (
        <img
          src={`${publicUrl}/img/${icon}`}
          alt={icon}
          className={classes.img}
        />
      )}
    </button>
  );
};
