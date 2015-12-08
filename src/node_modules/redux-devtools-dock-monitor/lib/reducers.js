'use strict';

exports.__esModule = true;
exports['default'] = reducer;

var _actions = require('./actions');

var _constants = require('./constants');

function position(state, action, props) {
  if (state === undefined) state = props.defaultPosition;
  return (function () {
    return action.type === _actions.CHANGE_POSITION ? _constants.POSITIONS[(_constants.POSITIONS.indexOf(state) + 1) % _constants.POSITIONS.length] : state;
  })();
}

function size(state, action, props) {
  if (state === undefined) state = props.defaultSize;
  return (function () {
    return action.type === _actions.CHANGE_SIZE ? action.size : state;
  })();
}

function isVisible(state, action, props) {
  if (state === undefined) state = props.defaultIsVisible;
  return (function () {
    return action.type === _actions.TOGGLE_VISIBILITY ? !state : state;
  })();
}

function childMonitorState(state, action, props) {
  var child = props.children;
  return child.type.reducer(state, action, child.props);
}

function reducer(state, action, props) {
  if (state === undefined) state = {};

  return {
    position: position(state.position, action, props),
    isVisible: isVisible(state.isVisible, action, props),
    size: size(state.size, action, props),
    childMonitorState: childMonitorState(state.childMonitorState, action, props)
  };
}

module.exports = exports['default'];