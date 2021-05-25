import React from 'react';
import { shallow } from 'enzyme';
import TopPartners from './TopPartners';

const defaultProps = {
  becomePartnerLink: 'ThatLink',
  partners: [
    {
      companyLogo: 'images/logo.that.wi.jpg',
      companySlug: 'ThatSlug',
      companyName: 'That Conference',
    },
  ],
  title: 'ThatTitle',
  className: '',
};

describe('TopPartners', () => {
  test('it renders with valid props', () => {
    const wrapper = shallow(<TopPartners {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  // test('it fails with null becomeParterLink', () => {
  //   const props = { ...defaultProps };
  //   props.becomePartnerLink = null;

  //   expect(() => {
  //     shallow(<TopPartners {...props} />);
  //   }).toThrow(/(Failed prop type)/);
  // });

  // test('it fails with undefined becomeParterLink', () => {
  //   const props = { ...defaultProps };
  //   props.becomePartnerLink = undefined;

  //   expect(() => {
  //     shallow(<TopPartners {...props} />);
  //   }).toThrow(/(Failed prop type)/);
  // });

  // test('it fails with null partners', () => {
  //   const props = { ...defaultProps };
  //   props.partners = null;

  //   expect(() => {
  //     shallow(<TopPartners {...props} />);
  //   }).toThrow(/(Failed prop type)/);
  // });

  // test('it fails with undefined partners', () => {
  //   const props = { ...defaultProps };
  //   props.partners = undefined;

  //   expect(() => {
  //     shallow(<TopPartners {...props} />);
  //   }).toThrow(/(Failed prop type)/);
  // });

  test('it renders with empty partners', () => {
    const props = { ...defaultProps };
    props.partners = [];

    const wrapper = shallow(<TopPartners {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  // test('it fails with null title', () => {
  //   const props = { ...defaultProps };
  //   props.title = null;

  //   expect(() => {
  //     shallow(<TopPartners {...props} />);
  //   }).toThrow(/(Failed prop type)/);
  // });

  // test('it fails with undefined title', () => {
  //   const props = { ...defaultProps };
  //   props.title = undefined;

  //   expect(() => {
  //     shallow(<TopPartners {...props} />);
  //   }).toThrow(/(Failed prop type)/);
  // });

  test('it sets div className to value passed in', () => {
    const props = { ...defaultProps };
    props.className = 'ThatClassName';

    const wrapper = shallow(<TopPartners {...props} />);
    expect(wrapper.find('.ThatClassName')).toHaveLength(1);
  });
});
