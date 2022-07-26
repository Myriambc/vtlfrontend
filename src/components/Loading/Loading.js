import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    'width': '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const Loading = ()=> {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress color="primary"/>
    </div>
  );
};
export default Loading;
