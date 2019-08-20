import React from 'react';
import HomePage from './components/HomePage';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Details from './components/Details';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <Route exact path="/" component={() => <HomePage />} />
        <Route path="/homepage" component={() => <HomePage />} />
        <Route path="/details" component={() => <Details />} />
      </Router>
    </div>
  );
}

export default App;