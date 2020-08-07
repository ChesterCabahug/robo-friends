import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: "",
        };
    }

    componentDidMount() {
        fetch(`http://jsonplaceholder.typicode.com/users`)
            .then((response) => response.json())
            .then((users) => this.setState({ robots: users }));
    }

    onSearchChange = (e) => {
        this.setState({ searchField: e.target.value });
    };

    render() {
        const {robots, searchField} = this.state
        const filteredRobots = robots.filter((robot) => {
            return robot.name
                .toLowerCase()
                .includes(searchField.toLowerCase());
        });

        if (robots.length === 0) {
            return <h1>Loading....</h1>;
        } else {
            return (
                <div className="App tc">
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;
