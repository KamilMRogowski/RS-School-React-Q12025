import React from 'react';

type searchBoxProps = { onSearch: (query: string) => void };
type searchBoxState = { query: string };

export default class SearchBox extends React.Component<
  searchBoxProps,
  searchBoxState
> {
  constructor(props: searchBoxProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  // Update the query state when the input value changes
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  // Trigger the onSearch callback passed as a prop from parent with current query state, trim trailing spaces
  handleClick = () => {
    this.props.onSearch(this.state.query.trim());
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search your favorite pokemon"
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}
