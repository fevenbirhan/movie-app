import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import SearchBox from './common/searchBox';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';
import { Link } from 'react-router-dom';

export default class Movies extends Component {
    state = { 
       movies: [],
       genres: [],
       pageSize: 4,
       currentPage: 1,
       searchQuery: "",
       selectedGenre: null,
       sortColumn: { path: "title", order: "asc" }
    };

    componentDidMount() {
        const genres = [{ _id: "", name: 'All Genres' }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movie };
        movies[index].like = !movie.like;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    };

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn }); 
    };

    getPagedData = () => {
        const { currentPage, pageSize, selectedGenre, searchQuery, sortColumn, movies: allMovies } = this.state;

        let filtered = allMovies;
        if (searchQuery) {
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        }
        else if(selectedGenre && selectedGenre._id){
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
        }
        
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    };

    render() { 
        const { length: count } = this.state.movies;
        const { currentPage, pageSize, genres, searchQuery, sortColumn } = this.state;

        if(count === 0)
            return "There are no movies in the database.";

        const {totalCount, data: movies} = this.getPagedData();

        return(
          <div className="row">
            <div className="col-2">
                <ListGroup 
                    items={genres} 
                    onItemSelect={this.handleGenreSelect} 
                    selectedItem={this.state.selectedGenre} 
                />
            </div>
            <div className="col">
                <Link to="/movies/new" className="btn btn-primary" style={{marginBottom: 20}}>New Movie</Link>
                <p>Showing {totalCount} movies in the database.</p>
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
                <MoviesTable 
                    movies={movies} 
                    onDelete={this.handleDelete} 
                    onLike={this.handleLike} 
                    onSort={this.handleSort}
                    sortColumn={sortColumn}
                />
                <Pagination 
                    itemsCount={totalCount} 
                    pageSize={ pageSize } 
                    currentPage={ currentPage } 
                    onPageChange={this.handlePageChange}
                />
            </div>  
          </div>
        );
    }
}