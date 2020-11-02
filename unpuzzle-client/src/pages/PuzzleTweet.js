import React, { useEffect, useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Puzzlepiece from '../components/puzzlepiece/Puzzlepiece';
import Profile from '../components/profile/Profile';
import Puzzle from '../components/puzzlepiece/Puzzle';
import axios from 'axios';
import PuzzlepieceSkeleton from '../util/PuzzlepieceSkeleton';
import { connect } from 'react-redux';
import { getPuzzlepieces } from '../redux/actions/dataActions';

const config = require('../aws/api/config.json');
const useStyles = makeStyles(theme => ({
  pushDown: {
    height: "2000px"
  }
}))

const PuzzleTweet = (props) => {


const [puzzles, setPuzzles] = useState([]);

const  fetchPuzzles = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/puzzle`);
      setPuzzles(res.data)
    } catch (err) {
      console.log(`An error has occured ${err}`);
    }
  }

  useEffect(() => {
    fetchPuzzles();
    props.getPuzzlepieces();
  }, []) 
    const { puzzlepieces, loading } = props.data;
    let recentPuzzlepiecesMarkup = !loading ? (
      puzzlepieces.map(puzzlepiece =>
        <Puzzlepiece key={puzzlepiece.puzzlepieceId} puzzlepiece={puzzlepiece} />
      )
    ) : (
      <PuzzlepieceSkeleton/>
    );
    return (
      <Fragment>
        <Grid container>
          { /* Curly braces { } are special syntax in JSX. 
            It is used to evaluate a JavaScript expression during compilation. 
            A JavaScript expression can be a variable, function, 
            an object, or any code that resolves into a value. */ }
          {/* AWS Integration
            {
              puzzles && puzzles.length > 0
              ? puzzles.map(puzzle => <Puzzle puzzleName={puzzle.puzzleName} id={puzzle.id} key={puzzle.id} />)
              : <div>No puzzle available</div>
            }   
          */}
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={8} xs={12}>
            {recentPuzzlepiecesMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </Fragment>
    )
  }


const mapStateToProps = state => ({
  data: state.data
})
export default connect(mapStateToProps, {getPuzzlepieces})(PuzzleTweet);

