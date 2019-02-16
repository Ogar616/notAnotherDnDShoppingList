import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

import { Droppable, Draggable } from "react-beautiful-dnd";

const styles = theme => ({
  root: {
    listStyleType: "none",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center"
  },
  list: {
    width: "30%"
  },
  badge: {
    top: "15%",
    right: "15%",
    width: "40%",
    height: "40%",
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  },
  deleteHover: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: "red"
    }
  },
  infoHover: {
    color: theme.palette.primary.light,
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
});

class Selected extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Droppable droppableId="droppable2">
        {provided => (
          <div ref={provided.innerRef} className={classes.list}>
            <Typography variant="h6" gutterBottom>
              Items to buy
            </Typography>
            {this.props.state.selected.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ListItem
                      key={index}
                      role={undefined}
                      dense
                      button
                      // onClick={this.handleToggle(item)}
                    >
                      <ListItemText primary={item.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="Edit item"
                          // onClick={() => this.handleOpenEdit(index)}
                        >
                          <EditIcon className={classes.infoHover} />
                        </IconButton>
                        <IconButton
                          aria-label="Delete item"
                          // onClick={handleOpenDelete.bind(this, index)}
                        >
                          <DeleteIcon className={classes.deleteHover} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

Selected.propTypes = {
  classes: PropTypes.object.isRequired,
  openInfo: PropTypes.bool,
  openDelete: PropTypes.bool,
  handleOpenInfo: PropTypes.func,
  handleCheckItem: PropTypes.func,
  getList: PropTypes.func,
  handleEditItem: PropTypes.func
};

const mapStateToProps = state => {
  return { list: state.list, store: state, checked: state.checked };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenInfo: index =>
      dispatch({ type: "SHOW_INFO_DIALOG", index: index }),
    handleOpenEdit: index =>
      dispatch({ type: "SHOW_EDIT_DIALOG", index: index }),
    handleCheckItem: value => dispatch({ type: "HANDLE_CHECK", value: value }),
    handleOpenDelete: index =>
      dispatch({ type: "SHOW_DELETE_DIALOG", index: index }),
    handleEditItem: index => dispatch({ type: "EDIT_ITEM", index: index }),
    getList: list => dispatch({ type: "GET_LIST", list: list }),
    getChecked: checked => dispatch({ type: "GET_CHECKED", checked: checked })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Selected));