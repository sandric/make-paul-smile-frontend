import {openingRequestStarted, openingRequestFinished} from '../src/redux/actions/gameActions.js'

describe('Test gameActions',()=>{
  it('+++ actionCreator openingRequestStarted', () => {
    const requestStarted = openingRequestStarted()
    expect(requestStarted).toEqual({type:"OPENING_REQUEST_STARTED"})
  });
  
  it('+++ actionCreator openingRequestStarted', () => {
    const requestFinished = openingRequestFinished({id: 5})
    expect(requestFinished).toEqual({type:"OPENING_REQUEST_FINISHED", opening: { id: 5 }})
  });
});
