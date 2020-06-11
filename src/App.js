import React, { Component } from "react";
import { fetchdata } from "./components/api/covidapi";
import logo from "./img/image.png";

import Cards from "./components/Card/Cards";
import Chart from "./components/Chart/Chart";
import Country from "./components/Country/Country.js";

export default class App extends Component {
  state = {
    confirmed: "",
    recovered: "",
    deaths: "",
    lastUpdate: "",
    country: null,
  };

  handleCountryChange = async (countrys) => {
    const { confirmed, deaths, recovered, lastUpdate } = await fetchdata(
      countrys
    );

    /*
for country
*/
    this.setState({
      confirmed,
      recovered,
      deaths,
      lastUpdate,
      country: countrys,
    });
  };

  async componentDidMount() {
    const { confirmed, deaths, recovered, lastUpdate } = await fetchdata();

    this.setState({
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    });
  }

  render() {
    return (
      <div>
        <img
          src={logo}
          style={{ display: "block", margin: "auto", marginBottom: "50px" }}
          alt="Covid-19"
        />
        <Cards state={this.state} />
        <Country handleCountryChange={this.handleCountryChange} />
        <Chart state={this.state} />
      </div>
    );
  }
}
