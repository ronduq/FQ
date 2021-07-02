import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import Icon from '../Icon/Icon';
import t from '../Icon/Icon.module.scss';

import s from './LinkButton.module.scss';

const LinkButton = ({label, href, as}) => {
  return (
    <Link href={href} as={as}>
      <a className={s.linkButton}>
        {label} <Icon className={classNames(s.arrowIcon, t.iconSmall, t.iconOrange, s.arrowRight)} iconName={`chevron`} />
      </a>
    </Link>
  );
};

LinkButton.defaultProps = {
  href: '/',
  as: '/'
};

LinkButton.propTypes = {
  link: PropTypes.string,
  as: PropTypes.string,
};

export default LinkButton;
