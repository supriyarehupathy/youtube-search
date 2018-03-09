import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { getImageUrl } from '../../../common/utils';
import Loader from '../../../common/components/loader';

import {
  SEARCH_PLACEHOLDER,
  DISLIKE_BTN_IMAGE,
} from '../../../common/constants';

import styles from './styles';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  onFilterSelect(filter) {
    this.setState({ searchText: filter });
    if (this.state.showMobileSearch) {
      this.setState({ showMobileSearch: false });
    }
  }


  handleSearch = (event) => {
    const { handleTextSearch } = this.props;
    if (event.target.value) {
      this.setState({ searchText: event.target.value }, () => {
        if (this.state.searchText.length >= 3) {
          handleTextSearch(this.state.searchText);
        }
      });
    } else {
      this.clearFilter();
    }
  }

  clearFilter() {
    const {
      onClearSelectedResult,
      onClearTextSearchResults,
    } = this.props;
    this.setState({ searchText: '' });
    onClearSelectedResult();
    onClearTextSearchResults();
  }

  render() {
    const { isInProgress } = this.props;
    const {
      searchText,
    } = this.state;
    return (
      <div className={css(styles.headerContainer)}>
        <div className={css(styles.headerWrapper)}>
          <div className={css(styles.searchContainer)}>
            <input
              type="text"
              value={searchText}
              onChange={event => this.handleSearch(event)}
              className={css(styles.searchField)}
              placeholder={SEARCH_PLACEHOLDER}
            />
            {searchText.length ?
              <img
                src={getImageUrl(DISLIKE_BTN_IMAGE)}
                className={css(styles.clearFilter)}
                onClick={() => this.clearFilter()}
                alt="close icon"
              />
              : null
            }
            {isInProgress ?
              <Loader />
              : null
            }
          </div>

        </div>
      </div>
    );
  }
}

Search.propTypes = {
  handleTextSearch: PropTypes.func,
  onClearSelectedResult: PropTypes.func,
  onClearTextSearchResults: PropTypes.func,
  isInProgress: PropTypes.bool,
};

Search.defaultProps = {
  handleTextSearch: null,
  onClearSelectedResult: null,
  onClearTextSearchResults: null,
  isInProgress: false,
};


export default Search;
