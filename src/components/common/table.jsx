import React, { Component } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

export default class Table extends Component {

    render() { 
        const { columns, data, sortColumn, onSort} = this.props;
        
        return (
            <table className="table">
                <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>
                <TableBody data={data} columns={columns}/>
            </table> 
        );
    }
}