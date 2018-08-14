import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class CircularDeterminate extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <CircularProgress
          className={classes.progress}
          color="secondary"
          size={50}
        />
      </div>
    );
  }
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularDeterminate);