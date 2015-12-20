import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';


export default class UIListItem extends Component {

    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const {handleClick,data}  = this.props;
        handleClick(data);
    }

    render() {
        const {getListItemContent,getListItemHeader,data}  = this.props;
        var itemContent = getListItemContent(data);
        var itemHeader = getListItemHeader(data);
        return <ListGroupItem onClick={this.onClick} header={itemHeader}>{itemContent}</ListGroupItem>;
    }
}
