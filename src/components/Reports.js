import React from "react";
import Nav from "./Nav";
import { getReportByDate } from "./Util";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("isLogged"),
            report: {},
            projects_count_by_statuses: [],
            projects_count_by_category: [],
            periodOfData: 9999,
            update: 0,
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.getReportByDate = this.getReportByDate.bind(this);
        this.setPeriodOfData = this.setPeriodOfData.bind(this);
    }
    componentDidMount() {
        this.getReportByDate(this.state.periodOfData);
    }
    changeLoginStatus() {
        this.setState({
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("userId"),
        });
    }
    setPeriodOfData(e) {
        this.setState({ periodOfData: e.target.value });
        this.getReportByDate(e.target.value);
    }
    async getReportByDate(period) {
        if (sessionStorage.getItem("userId") != "null") {
            var result = await getReportByDate(period);
        }
        if (sessionStorage.getItem("userId") != "null") {
            this.setState({
                report: result,
                projects_count_by_statuses: result.projects_count_by_statuses,
                projects_count_by_category: result.projects_count_by_category,
            });
            console.log(this.state.report.projects_count_by_statuses);
        }
    }
    render() {
        return (
            <div className="global-background">
                <div className="global-content">
                    <Nav
                        isLogged={this.state.isLogged}
                        changeStatus={this.changeLoginStatus}
                    />
                    <button
                        className="global-button"
                        value={1}
                        onClick={this.setPeriodOfData}
                    >
                        Dzień
                    </button>
                    <button
                        className="global-button"
                        value={7}
                        onClick={this.setPeriodOfData}
                    >
                        Tydzień
                    </button>
                    <button
                        className="global-button"
                        value={31}
                        onClick={this.setPeriodOfData}
                    >
                        Miesiąc
                    </button>
                    <button
                        className="global-button"
                        value={365}
                        onClick={this.setPeriodOfData}
                    >
                        Rok
                    </button>
                    <button
                        className="global-button"
                        value={9999}
                        onClick={this.setPeriodOfData}
                    >
                        Wszystkie
                    </button>
                    <table class="admin-panel-users-table">
                        <tbody>
                            {this.state.periodOfData == 1 && (
                                <h1>Raport dzienny</h1>
                            )}
                            {this.state.periodOfData == 7 && (
                                <h1>Raport tygodniowy</h1>
                            )}
                            {this.state.periodOfData == 31 && (
                                <h1>Raport miesięczny</h1>
                            )}
                            {this.state.periodOfData == 365 && (
                                <h1>Raport roczny</h1>
                            )}
                            {this.state.periodOfData == 9999 && (
                                <h1>Raport całosciowy</h1>
                            )}
                            <tr>
                                <th>Nazwa</th>
                                <th>Ilość</th>
                            </tr>
                            <tr>
                                <td>Ilość projektów</td>
                                <td>{this.state.report.projects_count}</td>
                            </tr>
                            <tr>
                                <td>Ilość ofert</td>
                                <td>{this.state.report.offers_count}</td>
                            </tr>
                            <tr>
                                <td>Ilość ofert</td>
                                <td>{this.state.report.users_count}</td>
                            </tr>
                            <tr>
                                <th colspan="2">Projekty według statusów</th>
                            </tr>
                            <tr>
                                <th>Nazwa</th>
                                <th>Ilość</th>
                            </tr>
                            {this.state.projects_count_by_statuses.map(
                                (item) => (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.projects_count}</td>
                                    </tr>
                                )
                            )}
                            <tr>
                                <th colspan="2">Projekty według kategorii</th>
                            </tr>
                            <tr>
                                <th>Nazwa</th>
                                <th>Ilość</th>
                            </tr>
                            {this.state.projects_count_by_category.map(
                                (item) => (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.projects_count}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    <br />
                </div>
            </div>
        );
    }
}
export default Reports;
