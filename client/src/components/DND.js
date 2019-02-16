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

import Items from './lists/items';
import Selected from './lists/selected';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { reorder, move } from './data/moveFunctions';

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
const store = {
  items: [
    {
      name: "breadAPI",
      info: "Buy in Lidl",
      id: "item-0"
    },
    {
      name: "milkAPI",
      info: "",
      id: "item-1"
    },
    {
      name: "potatoesAPI",
      info: "Buy in Tesco",
      id: "item-2"
    },
    {
      name: "beerAPI",
      info: "",
      id: "item-3"
    },
    {
      name: "newBeerAPI",
      info: "damian",
      id: "item-4"
    }
  ],
  selected: [
    {
      name: "potatoesAPI selected",
      info: "Buy in Tesco",
      id: "item-5"
    },
    {
      name: "pot selected",
      info: "Buy in Tesco",
      id: "item-6"
    },
    {
      name: "p selected",
      info: "Buy in Tesco",
      id: "item-7"
    },
    {
      name: "API selecteed",
      info: "Buy in Tesco",
      id: "item-8"
    }
  ],
  checked: [
    {
      name: "newBeerAPI",
      info: "damian"
    }
  ]
};

class Lists extends Component {
  state = {
    items: store.items,
    selected: store.selected
  };

  id2List = {
    droppable: "items",
    droppable2: "selected"
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2
      });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Items state={this.state}/>
          <Selected state={this.state}/>
        </DragDropContext>
      </div>
    );
  }
}
Lists.propTypes = {
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
)(withStyles(styles)(Lists));