import React from 'react';

type searchBoxProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
};
type searchBoxState = { query: string };

export default class SearchBox extends React.Component<
  searchBoxProps,
  searchBoxState
> {
  constructor(props: searchBoxProps) {
    super(props);
    this.state = {
      query: props.searchQuery || '',
    };
  }

  componentDidUpdate(prevProps: searchBoxProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ query: this.props.searchQuery });
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleClick = () => {
    this.props.onSearch(this.state.query.trim());
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          placeholder="Search your favorite pokemon"
          onChange={this.handleChange}
          value={this.state.query}
        />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}
