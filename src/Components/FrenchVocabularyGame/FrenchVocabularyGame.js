import React, { Component } from 'react';
import './FrenchVocabularyGame.css';
import vocabulary from './Vocabulary.js';
import ProgressBar from "@ramonak/react-progress-bar";
import { motion } from "framer-motion";


class FrenchVocabularyGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWordEnglish: '',
      currentWordFrench: '',
      userInput: '',
      isCorrect: null,
      totalAttempts: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      stage: 'no results', // show results or not
      difficultMode: false
    };
  }


// This selects the current words from the database by changing the current state to them 
selectWord = (totalAttempts) => {
    const { customList } = this.props;
    // console.log('total vocab', vocabulary)
    // const selectedWord = vocabulary[this.state.totalAttempts];
    // const selectedWord = this.props.customList[this.state.totalAttempts];
    if (customList && customList.length > this.state.totalAttempts) {
        const selectedWord = customList[this.state.totalAttempts];
        console.log('custom list in FrenchVocabularyGame.js 2', this.props.customList)
    this.setState({
        currentWordEnglish: selectedWord.English,
        currentWordFrench: selectedWord.French,
        userInput: '',
        isCorrect: null
    });
}
};


// Method to handle user input
handleUserInput = (event) => {
this.setState({ userInput: event.target.value });
};

// Method to check user answer
checkAnswer = () => {
const { userInput, currentWordFrench } = this.state;

// Case-insensitive and diacritical mark-insensitive comparison
const removeDiacriticalMarks = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
const isCorrect =
removeDiacriticalMarks(userInput.toLowerCase()) === removeDiacriticalMarks(currentWordFrench.toLowerCase());
// Normal
// const isCorrect = userInput.toLowerCase() === currentWordFrench.toLowerCase();

this.setState({ isCorrect });
if (isCorrect === true ) {
    this.setState((prevState) => ({
        correctAnswers: prevState.correctAnswers + 1}));
} else if (isCorrect === false) {
    this.setState((prevState) => ({
        incorrectAnswers: prevState.incorrectAnswers + 1}));
    // Now we want to ensure that words that are answered incorrectly are fed back to the user later    
    const delayFactor = 0.25; // This defins how much later in the list the user will receive the word they answered incorrectly 
    const indexToInsert = this.state.totalAttempts + Math.ceil(this.props.customList.length * delayFactor)
    this.props.customList.splice(indexToInsert, 0, this.props.customList[this.state.totalAttempts])
    }
this.setState((prevState) => ({
    totalAttempts: prevState.totalAttempts + 1
    }));
};

// Method to move to the next word
nextWord = () => {
this.selectWord();
};

// This renders a word to translate the moment that the app renders
componentDidMount() {
this.selectWord(); // Select a word when the component mounts 
// this.setState({ totalAttempts: 0 })
}

// Method to handle the user pressing 'enter'
handleKeyPress = (event) => {
    if ((event.key === "Enter") && (this.state.stage === 'no results')) {
    this.checkAnswer();
    this.setState({ stage: 'results' })}
    if ((event.key === "Enter") && (this.state.stage === 'results')) {
        this.nextWord();
        this.setState({ stage: 'no results' })
    }
};

handleToggle = () => {
    this.setState((prevState) => ({ difficultMode: !prevState.difficultMode }));
  };

restart = () => {
    const result = window.confirm("Are you sure you want to proceed? You will lose all your progress");
    if (result) {
        this.setState({ 
            totalAttempts: '0',
            currentWordEnglish: this.props.customList[0].English,
            currentWordFrench: this.props.customList[0].French,
            userInput: '',
            isCorrect: null,
            totalAttempts: 0,
            correctAnswers: 0,
            incorrectAnswers: 0})
    }
   
}

hint = () => {
    console.log('give hint')
}

  render() {
    const { currentWordEnglish, currentWordFrench, userInput, isCorrect, totalAttempts, correctAnswers, incorrectAnswers, difficultMode} = this.state;
    // console.log('custom list in FrenchVocabularyGame.js', this.props.customList)
    return (
        <div className="All">
        <div className='pa2 pt9 tc'>
            <nav style={{display: 'flex ', justifyContent: 'flex-end'}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <p onClick={() => this.props.onRouteChange('setup')} className='f4 link dim black underline ph3 pointer'>Select Words</p>
                    <p onClick={() => this.props.onRouteChange('signout')} className='f4 link dim black underline ph3 pointer'>Sign Out</p>
                </div>
            </nav>
            <h1>French Vocabulary Game</h1>
            <div className="toggle-container pb1 ph3">
                <div>Easy Mode</div>
                <div className="toggle-switch" onClick={this.handleToggle}>
                    <input type="checkbox" checked={difficultMode} onChange={() => {}} />
                    <div className={`slider ${difficultMode ? 'on' : 'off'}`} />
                </div>
                <div>Difficult Mode</div>
            </div>
            <div className="pb1">(In Difficult Mode you need to inlude all special charachters)</div>
            {/* {(totalAttempts > 0) && <ProgressBar completed={totalAttempts/(vocabulary.length)*100} />} */}
            {(totalAttempts > 0) && <ProgressBar completed={totalAttempts/(this.props.customList.length)*100} />}
            <h5>Translate the following:</h5>
            <motion.p className="b pb2 f3" animate={{ y: 5, scale: 1}} initial={{ scale:0}}>{currentWordEnglish}</motion.p>
            <input 
            className='f4 pa1 pv2 w-20 center' 
            type="text" value={userInput} 
            onChange={this.handleUserInput} 
            placeholder='Type here...'
            onKeyPress={this.handleKeyPress}/>
            {isCorrect !== null && (
            <div className='pv1'>{isCorrect ? 'Correct!' : <p>Incorrect! The correct answer is: {currentWordFrench}</p>}</div>
            )}
        </div>

        {(totalAttempts !== (this.props.customList.length)) ?
        <div>
            <div>
            <button className='grow f6 mh2 link dib bg-light-purple' onClick={this.hint}>Hint</button>
                <button className='grow f4 mh2 link dib bg-light-purple' onClick={this.checkAnswer}>Check Answer</button>
                <button className='grow f4 mh2 link dib bg-light-purple' onClick={this.nextWord}>Next Word</button>
                <button className='grow f6 mh2 link dib bg-light-purple' onClick={this.restart}>Restart</button>
            </div>
            <p>*Use the buttons or use the 'Enter' key*</p>
            <div className='f4'>
                <div className='bordered-content'>
                    <b>Your progress:</b>
                    <div>Total Answered = {totalAttempts}</div>
                    <div>Correct answers = {correctAnswers}</div>
                    <div>Incorrect answers = {incorrectAnswers}</div>
                    {(totalAttempts > 0) && <div>Accuracy = {(correctAnswers/totalAttempts* 100).toFixed(2)}%</div>}
                </div>
            </div>
        </div>
        :
        <div>
            <h3>Congratulations! You have completed the level</h3>
            <h4>Here are your final results:</h4>
            <div className='f4'>
                <div className='bordered-content'>
                    <div>Total Answered = {totalAttempts}</div>
                    <div>Correct answers = {correctAnswers}</div>
                    <div>Incorrect answers = {incorrectAnswers}</div>
                    {(totalAttempts > 0) && <div>Accuracy = {(correctAnswers/totalAttempts* 100).toFixed(2)}%</div>}
                </div>
            </div>
            <h4>Click here to learn more words</h4>
            <button className='grow f4 mh2 link dib bg-light-purple' onClick={() => this.props.onRouteChange('setup')}>Learn More Words</button>
        </div>
        }


        {/* <p>**There are five accent marks in French, and each of them can significantly impact the way you pronounce French words. Therefore enter words correctly WITH ACCENTS**</p>
        <p>é – the acute accent (l'accent aigu)<br />à/è/ì/ò/ù – the grave accent (l'accent grave)<br />â/ê/î/ô/û – the circumflex (l'accent circonflexe)<br />ç – the cedilla (la cédille)<br />ë/ï/ü – the trema (l'accent tréma)</p>
        <b>Functions to add:<br />Sort order - don't have 2 words in a row<br />Have levels<br />Display statistics<br />Make spelling allowances especially for incorrect accents and capital letters<br />Style well with nice background<br />Add pictures<br />Animation when new word appears</b> */}
        </div>
    );
  }
}

export default FrenchVocabularyGame;