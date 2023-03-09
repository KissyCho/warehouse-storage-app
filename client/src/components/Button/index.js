const Button = ({ classNames, type, btnType, children, ...rest }) => {
    return (
      <button
        type={type}
        className={`btn btn-${btnType} ${classNames}`}
        {...rest}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  