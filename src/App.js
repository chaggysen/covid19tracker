import React from "react";
// import Cards from "./components/Cards/Cards";
// import Chart from "./components/Chart/Chart";
// import CountryPicker from "./components/CountryPicker/CountryPicker";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/index.png";

// async await in JS is nothing more than syntactic sugar over promises. Promises are fine, yet in some situations you may end up with a long chain of then/catch
// asyn await makes your code cleaner and readable. plus you can use try/catch for proper error handling.
// Used mostly for data fetching and other initialization stuff, componentDidMount is a nice place for async/await in React
// We call the fetchData function in the componentDidMount
class App extends React.Component {
  state = {
    data: {},
    // We need the country parameter in the app because App is the parent of card chart and countryPicker. We can pass down the state to all the three components
    country: "",
  };
  // Here we populate the fetchedData in our state
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({
      data: fetchedData,
    });
  }
  handleCountryChange = async (country) => {
    // Here we call the fetchData with a country parameter
    const fetchedData = await fetchData(country);

    // fetch data
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="Covid-19" />
        <Cards data={data} />
        {/* Here we pass down this method as prop to countryPicker */}
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
