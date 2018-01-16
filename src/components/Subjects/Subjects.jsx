import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';

import Subject from '../Game/Game';

import { subjectsRequest } from '../../redux/actions/subjectActions'

import './Subjects.css';


class Subjects extends React.Component {

  static fetchData(dispatch) {
    return dispatch(subjectsRequest())
  }

  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <main className="subjects">
        <ul className="subjects">
          {this.props.subjects && this.props.subjects.map((subject) =>
                                                          <li key={subject.id}>
                                                              <Link to={`/subjects/${subject.slug}/`}>
                                                                  {subject.title}
                                                                </Link>
                                                                <h3>{subject.description}</h3>
                                                            </li>
                                                         )}
        </ul>
      </main>
    );
  }
}

function mapStateToProps(state) {
  const { loading, subjects } = state.subjects;

  return { loading, subjects };
}

function mapDispatchToProps(dispatch) {
  return {
    getSubjects: () => {
      dispatch(subjectsRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);
