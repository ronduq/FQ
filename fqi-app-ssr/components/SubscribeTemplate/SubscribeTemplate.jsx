import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import s from './SubscribeTemplate.scss';
import layout from '../../hocs/Layout';
import Icon from '../Icon/Icon';

class SubscribeTemplate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      validEmail: false,
      submited: false,
      emailAddress: '',
      showError: false,
    }
    this.validateEmail = this.validateEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.validEmail) {
      const input = this.state.emailAddress;
      const url = `${process.env.BASE_URL}/api/v1/user/subscribe`;
      fetch(url, {
          method: 'POST',  
          body: JSON.stringify(input),  
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then(response => {
          console.log('Success:', JSON.stringify(response))
          this.setState({submited: true})
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      this.setState({showError: true})
    }
    
  }
   
  validateEmail = (event) => {
    event.preventDefault();
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {value} = event.target
    if (value.match(mailformat)) {
      this.setState({
        validEmail: true,
        emailAddress: value,
        showError: false,
      });
    } else {
      this.setState({validEmail: false})
    }
  }
  
  render() {
    const { content } = this.props;

    return (
      <div className={classNames('container','container--body', s.subscribe)}>

        { !this.state.submited &&
          <div>
            <div className='layout layout--12'>
              <div className='layout__column--12'>
                <section className={s.intro}>
                  <h1>{content.title}</h1>
                  <h2 className={s.subtitle}>{content.subtitle}</h2>
                </section>
              </div>
            </div>
            <div className='layout layout--3-6-3'>
              <div className='layout__column--1'>
              </div>
              <div className='layout__column--2'>
              <form onSubmit={(event) => this.handleSubmit(event)} className={s.subscribeForm}>
                <h2>{content.mail_title}</h2>
                <div className={s.wrapper}>
                  <input
                    placeholder={content.placeholder}
                    name="email"
                    type="text"
                    onChange={(event) => { this.validateEmail(event)} }
                  />
                    <button className={s.subscribeButton} type="submit">
                      <Icon className={s.ctaIcon} iconName="envelope" />
                      <span className={s.ctaText}>{content.button_text}</span>
                    </button>
                </div>
                <p className={s.description}>{content.description_text}</p>
                { this.state.showError &&
                  <p className={s.error}>{content.error_mail}</p>
                }
              </form>
              </div>
            </div>
          </div>
        }
        { this.state.submited &&

          <div className='layout layout--3-6-3'>
            <div className='layout__column--1'>
            </div>
            <div className={classNames('layout__column--2',s.thanks)}>
              <Icon className={s.largeIcon} iconName="envelope" />
              <h1>{content.thank_you_title}</h1>
              <h2 className={s.subtitle}>{content.thank_you_subtitle}</h2>
              <p className={s.description}>{content.thank_you_description}</p>
              <Link 
                href={`/`} 
                as={`/`}
              >
                <a className={s.linkButton}>
                {content.thank_you_button}
                </a>
              </Link>
            </div>
          </div>
        } 
      </div>   
    );
  };
}

SubscribeTemplate.propTypes = {
};

SubscribeTemplate.defaultProps = {
};

export default layout(SubscribeTemplate);