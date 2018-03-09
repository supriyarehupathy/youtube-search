import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import styles from './styles';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.list,
    });
  }

  render() {
    const {
      list,
      customComponent,
      name,
      type,
      ...rest
    } = this.props;
    const CustomComponent = customComponent;

    return (
      <div
        className={css(styles.container)}
      >
        {this.state.list.map((item, index) =>
          (<CustomComponent
            item={item}
            index={index}
            key={item.id.videoId}
            name={name || ''}
            {...rest}
          />))}
      </div>
    );
  }
}

Items.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  customComponent: PropTypes.func,
  list: PropTypes.array,
};

Items.defaultProps = {
  name: '',
  type: '',
  customComponent: null,
  list: [],
};

const List = props => (
  <div>
    <Items {...props} />
  </div>
);

export default List;

