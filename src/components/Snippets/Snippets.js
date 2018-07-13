import React, { Component } from 'react';
import data from '../../data/gameplay.json'
import { connect } from 'react-redux';

class Snippets extends Component {
    state = {
        displayedSnippets : []
    }
    render() {

        return (
            <React.Fragment>
                <React.Fragment>
                   <button onClick={this.addSnippet}>New Hint</button>
                </React.Fragment>
                <div>
                    {this.state.displayedSnippets.slice().reverse().map(snippet => {
                        return <p>{snippet}</p>
                    })}
                </div>
            </React.Fragment>
        );
    }
addSnippet = () => {
    if(this.state.displayedSnippets.length > 4){
        const newSnippets = [...this.state.displayedSnippets ]
        newSnippets.shift()
        this.setState({displayedSnippets: [...newSnippets, data.educationSnippets[Math.floor(Math.random() * data.educationSnippets.length)]]})
    }else{
      
        this.setState({displayedSnippets: [...this.state.displayedSnippets, data.educationSnippets[Math.floor(Math.random() * data.educationSnippets.length)]]})
    }
}
}
const mapStateToProps = store => {
    return {
      turnCount: store.gameProgress.turn_count,
    };
  };
  export default connect(
    mapStateToProps)(Snippets)