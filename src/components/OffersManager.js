import React from "react";
import Nav from "./Nav";
import { getOffersByDate, deleteOffer } from "./Util";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import Icon from "../icons/Icons";

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
        this.getOffersByDate(this.state.periodOfData);
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
        this.getOffersByDate(e.target.value);
    }
    async deleteOffer(e) {
        await deleteOffer(e.target.value);
        this.setState({
            update: this.state.update + 1,
        });
        this.getOffersByDate(this.state.periodOfData);
    }
    async getOffersByDate(period) {
        if (sessionStorage.getItem("userId") != "null") {
            var result = await getOffersByDate(period);
        }
        if (sessionStorage.getItem("userId") != "null") {
            this.setState({
                offers: result,
            });
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

                    {this.state.offers.map((offer) => (
                        <div className="list-offer-container">
                            <div className="offer-list-details">
                                <div className="offer-list-category">
                                    <Icon icon={offer.icon} />
                                    <b>
                                        <div>{offer.name}</div>
                                    </b>
                                </div>
                                <div className="offer-list-skills">
                                    {offer.skills.map((skill) => (
                                        <div>{skill.name}</div>
                                    ))}
                                </div>

                                <div className="offer-list-time-price">
                                    Przewidywany czas pracy:<span> </span>
                                    <b>{offer.estimated_time}</b> dni
                                    <span
                                        style={{
                                            width: "40px",
                                            display: "inline-block",
                                        }}
                                    ></span>
                                    Proponowana cena: <b>{offer.price}</b> PLN
                                </div>
                            </div>
                            <div className="offer-list-desc">
                                <p>{offer.message}</p>
                            </div>

                            <button
                                className="global-button"
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
                                <button className="global-button">
                                    Edytuj
                                </button>
                            </Link>

                            <br />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
export default OffersManager;
