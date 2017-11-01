import React, {Component, PropTypes} from 'react';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

const autoCompleteInputClass = {
    root: 'input-group input-group-lg',
    input: 'form-control border border-0'
};

function mapStateToProps(state) {
    return {
        dispatch: state.dispatch
    }
}

class Search extends Component {

    // static propTypes = {
    //     history: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props);
        this.state = {address: '', redirect: false};
        this.onChange = (address) => this.setState({address});
    }

    onButtonClick = (e) => {
        e.preventDefault();
        geocodeByAddress(this.state.address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .then(() => this.setState({ redirect: true}))
        .catch(error => console.error('Error', error));
        
        
    };

    render() {

        let {t} = this.props;

        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
            type: 'Search',
            placeholder: t("Please enter your address..."),
            autoFocus: true
        };

        if  (this.state.redirect){
            return <Redirect push to="/stores" />
        }

        return (
            
            <div className="row">
                <div className="col-md-9 col-lg-7">
                    <div className="input-group input-group-lg mt-3 bt-5 sd-box-shadow dark">
                        <PlacesAutocomplete inputProps={inputProps} classNames={autoCompleteInputClass}/>
                        <button className="btn btn-primary btn-lg" type="submit" onClick={this.onButtonClick}>{t("Search")}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(translate('translations')(Search));
