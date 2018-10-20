import * as React from 'react';
import { inject, observer } from 'mobx-react';
import ViewStore from '../../../stores/ViewStore';

interface AddPlayerFormProps {
  viewStore?: ViewStore;
}

interface AddPlayerFormState {
  playerName: string;
}

@inject('viewStore')
@observer
class AddPlayerForm extends React.Component<AddPlayerFormProps, AddPlayerFormState> {
  state = {
    playerName: ''
  };

  handleInputChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();

    const { viewStore } = this.props;
    const { playerName } = this.state;

    if (playerName && playerName.trim().length !== 0) {
      viewStore.addPlayer(playerName);
      this.setState({
        playerName: ''
      });
    }
  };

  render() {
    console.log('render');
    return (
      <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">Add new player</h3>
        </div>
        <div className="panel-body">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <div className="form-group">
                  <label htmlFor="playerName">Player Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="playerName"
                    name="playerName"
                    placeholder="Player name"
                    value={this.state.playerName}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-12">
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddPlayerForm;
