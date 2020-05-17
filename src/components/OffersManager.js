import React from "react";
import Nav from "./Nav";
import { getOffersByDate, deleteOffer } from "./Util";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";

class OffersManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("isLogged"),
            offers: [],
            update: 0,
            periodOfData: 9999,
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.setPeriodOfData = this.setPeriodOfData.bind(this);
        this.deleteOffer = this.deleteOffer.bind(this);
    }
    componentDidMount() {
        this.getOffersByDate();
    }
    componentDidUpdate() {
        this.getOffersByDate();
    }
    changeLoginStatus() {
        this.setState({
            isLogged: sessionStorage.getItem("isLogged"),
            userId: sessionStorage.getItem("userId"),
        });
        if (sessionStorage.getItem("userId") == "null") {
            this.setState({
                offers: [],
            });
        }
    }
    setPeriodOfData(e) {
        this.setState({ periodOfData: e.target.value });
    }
    async deleteOffer(e) {
        await deleteOffer(e.target.value);
        this.setState({
            update: this.state.update + 1,
        });
    }
    async getOffersByDate() {
        if (sessionStorage.getItem("userId") != "null") {
            var result = await getOffersByDate(this.state.periodOfData);
        }
        if (sessionStorage.getItem("userId") != "null") {
            this.setState({
                offers: result,
            });
        }
    }
    render() {
        return (
            <div>
                <Nav
                    isLogged={this.state.isLogged}
                    changeStatus={this.changeLoginStatus}
                />
                <button value={1} onClick={this.setPeriodOfData}>
                    Dzień
                </button>
                <button value={7} onClick={this.setPeriodOfData}>
                    Tydzień
                </button>
                <button value={31} onClick={this.setPeriodOfData}>
                    Miesiac
                </button>
                <button value={365} onClick={this.setPeriodOfData}>
                    Rok
                </button>
                <button value={9999} onClick={this.setPeriodOfData}>
                    Wszystkie
                </button>
                <ul>
                    {this.state.offers.map((offer) => (
                        <li>
                            <p>{offer.offer_id}</p>
                            <p>{offer.category_id}</p>

                            {offer.skills.map((skill) => (
                                <p>{skill.name}</p>
                            ))}
                            <p>{offer.message}</p>
                            <p>{offer.estimated_time}</p>
                            <p>{offer.price}</p>
                            <button
                                value={offer.offer_id}
                                onClick={this.deleteOffer}
                            >
                                Usuń
                            </button>

                            <Link
                                to={{
                                    pathname: "/editoffer",
                                    state: {
                                        offer: offer,
                                    },
                                }}
                            >
                                <button>Edytuj</button>
                            </Link>

                            <br />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default OffersManager;
