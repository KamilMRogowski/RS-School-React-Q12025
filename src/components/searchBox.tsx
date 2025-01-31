import React from 'react';

type searchBoxProps = { onSearch: (query: string) => void };
type searchBoxState = { query: string };

export default class searchBox extends React.Component<
  searchBoxProps,
  searchBoxState
> {
  constructor(props: searchBoxProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleClick = () => {
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}
