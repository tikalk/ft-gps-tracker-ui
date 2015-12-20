import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import UIListItem from '../components/UIListItem'

export default class UIList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {items,handleClick,getListItemContent,getListItemHeader}  = this.props;
        var renderedItems;
        if (items != null && Object.keys(items).length > 0) {
            var itemsArray = Object.keys(items).map(function (key) {
                return items[key]
            })
            renderedItems = itemsArray.map(function (item) {
                return <UIListItem handleClick={handleClick} getListItemContent={getListItemContent}
                                   getListItemHeader={getListItemHeader}
                                   data={item}/>;
            });
        }
        return (

            <ListGroup>
                {renderedItems}
            </ListGroup>
        );
    }
}
