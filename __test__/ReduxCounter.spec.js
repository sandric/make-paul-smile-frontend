import React from 'react';
import { Provider } from 'react-redux';

import ReduxCounter from '../src/components/CounterPage/ReduxCounter'
import {incrementCounter} from '../src/redux/actions/counterActions'
import configureStore from 'redux-mock-store'
import Enzyme, { mount, configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('test ReduxCounter', () => {
  const initialState = {counter: { value: 10 }}
  const mockStore = configureStore()
  let store, wrapper

  beforeEach(()=> {
    store = mockStore(initialState)
    wrapper = shallow( <ReduxCounter/> , { context: { store } })
  });

  it('test if component rendered', () => {
    expect(wrapper.length).toEqual(1)
  });
  
  it('test initial value', () => {
    expect(wrapper.prop('value')).toEqual(initialState.counter.value)
  });

  it('test incrementing counter', () => {
    let action
    store.dispatch(incrementCounter())
    store.dispatch(incrementCounter())
    action = store.getActions()

    expect(action[0].type).toBe("INCREMENT_COUNTER")
    expect(action[1].type).toBe("INCREMENT_COUNTER")

    expect(wrapper.update().prop('value')).toEqual(initialState.counter.value + 2);
  });
});
