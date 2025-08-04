import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';

export default class MoviesTable extends Component { 
    columns = [
        {path: "title", label: "Title", content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path: "genre.name", label: "Genre"},
        {path: "numberInStock", label: "Stock"},
        {path: "dailyRentalRate", label: "Rate"},
        {key: "Like", content: movie => <Like liked={movie.like} onClick={ () => this.props.onLike(movie)} />},
        {key: "Delete", content: movie => <button onClick={() => this.props.onDelete(movie)} className='btn btn-danger'>Delete</button>}
    ]

    render() { 
        const { movies, onSort, sortColumn } = this.props;

        return (
           <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort} />
        );
    }
}