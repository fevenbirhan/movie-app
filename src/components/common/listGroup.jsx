import React, { Component } from 'react';

export default class ListGroup extends Component { 
    render() { 
        const { items, textProperty, valueProperty, onItemSelect, selectedItem } = this.props;
        return (
            <ul className="list-group">
                {items.map(item => 
                    <li key={item[valueProperty]} 
                    className={ item === selectedItem ? 'list-group-item active' : 'list-group-item' } 
                    style={{cursor: 'pointer'}}
                    onClick={() => onItemSelect(item)}>{item[textProperty]}</li>
                )}   
            </ul>
        );
    }
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};