import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = (props) => {
  const { mode, className, children, ...restProps } = props;
  const classNames = ["Button", `Button__${mode || "primary"}`, className];

  return (
    <button className={classNames.join(" ")} {...restProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  mode: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Button;
