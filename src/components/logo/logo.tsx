import React from 'react';
import { AppRoute } from '../../constants/app-route.ts';
import { Link } from 'react-router-dom';

function Logo(): React.JSX.Element {
  return (
    <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>
  );
}

export default Logo;
