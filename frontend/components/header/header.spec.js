import React from 'react';
import { expect } from 'chai';
import { spy,stub } from 'sinon';
import { mount,shallow,configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const Header = require('./header');

describe('<Header />', () => {
  it('renders .nav-bar div', () => {
    stub(Header.prototype,'componentWillMount')
    const wrapper = shallow((<Header />));
    expect(wrapper.find('.nav-bar')).to.have.lengthOf(1);
  });
});

