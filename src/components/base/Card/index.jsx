import PropTypes from 'prop-types';
import { Card as CardFlowbite } from 'flowbite-react';
import style from './style.module.css';

const Card = ({ className, children, theme }) => {
  return (
    <CardFlowbite theme={theme} className={`w-full ${className}`}>
      {children}
    </CardFlowbite>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  theme: PropTypes.object,
};

Card.defaultProps = {
  className: '',
  theme: {},
};

Card.Divider = () => {
  return <hr className={style['card-divider']} />;
};

Card.Divider.displayName = 'Card.Divider';
export default Card;

export const CardThemeWithoutGap = {
  root: {
    base: 'flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800',
    children: 'flex h-full flex-col justify-center p-6',
    horizontal: {
      off: 'flex-col',
      on: 'flex-col md:max-w-xl md:flex-row',
    },
    href: 'hover:bg-gray-100 dark:hover:bg-gray-700',
  },
  img: {
    base: '',
    horizontal: {
      off: 'rounded-t-lg',
      on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
    },
  },
};

export const CardThemeFlexRow = {
  root: {
    base: 'flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800',
    children: 'flex h-full flex-row items-center p-6 gap-x-3',
    horizontal: {
      off: 'flex-col',
      on: 'flex-col md:max-w-xl md:flex-row',
    },
    href: 'hover:bg-gray-100 dark:hover:bg-gray-700',
  },
  img: {
    base: '',
    horizontal: {
      off: 'rounded-t-lg',
      on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
    },
  },
};
