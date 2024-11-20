import React, { Component } from "react";
import { connect } from "react-redux";
import { getFortnightlyReport } from "../store/actions"; // Action to fetch the report

class FortnightlyReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportData: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { getFortnightlyReport } = this.props;
    await getFortnightlyReport();
    this.setState({ reportData: this.props.reportData, loading: false });
  }

  render() {
    const { loading, reportData } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container mt-2">
        <h4>Fortnightly Report</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Intern Name</th>
              <th>Workplace</th>
              <th>Report Date</th>
              <th>Status</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report) => (
              <tr key={report.id}>
                <td>{report.internName}</td>
                <td>{report.workplace}</td>
                <td>{new Date(report.date).toLocaleDateString()}</td>
                <td>{report.status}</td>
                <td>{report.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reportData: state.reports.fortnightlyReports,
});

export default connect(mapStateToProps, { getFortnightlyReport })(FortnightlyReport);