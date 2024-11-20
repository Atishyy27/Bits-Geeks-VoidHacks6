import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAssignments, createAssignment } from "../store/actions"; // Actions to fetch and create assignments

class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      dueDate: "",
      assignments: [],
      loading: true,
    };
  }

  async componentDidMount() {
    await this.props.fetchAssignments();
    this.setState({ assignments: this.props.assignments, loading: false });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, dueDate } = this.state;
    await this.props.createAssignment({ title, description, dueDate });
    this.setState({ title: "", description: "", dueDate: "" });
    await this.props.fetchAssignments(); // Refresh assignments
  };

  render() {
    const { loading, assignments, title, description, dueDate } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container mt-2">
        <h4>Assignments</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={title}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              value={description}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={dueDate}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Assignment</button>
        </form>
        <h5 className="mt-4">Current Assignments</h5>
        <ul className="list-group">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="list-group-item">
              <h6>{assignment.title}</h6>
              <p>{assignment.description}</p>
              <small>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assignments: state.assignments.assignments,
});

export default connect(mapStateToProps, { fetchAssignments, createAssignment })(Assignments);