import React from "react";
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Image
} from 'react-vr';

import { withRouter, NativeRouter, Route, Push } from "react-router-native";
import { push } from 'connected-react-router'
import { func, bool, object } from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as viewingExhibitActions from "../../actions/Exhibition";
// import NavButton from "../../components/NavButton";

class WaitingRoomView extends React.Component {
  constructor() {
    super();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.exhibition.viewingExhibits) {
     this.props.history.push("/exhibit");
    }
  }

  componentWillMount() {
        this.setState({textColor:'yellow'});
  }

  _onViewClicked(dino) {
    this.props.viewExhibit.viewExhibito(dino);
  }

  render() {

    return (
      <View>
        <Pano style={{
                transform: [
                    {rotateY : 100},
                ]
            }}
            source={asset('dinoinside.jpg')}/>
        <Text
        style={{
            fontSize: 0.8,
            layoutOrigin: [0.5, 0.5],
            transform: [{translate: [0, 1, -3]}],
            color: this.state.textColor
          }}
        onEnter={() => this.setState({textColor: 'white'})}
        onExit={() => this.setState({textColor: 'white'})}>
          Dinosaur Museum
        </Text>
           
        <VrButton
          style={{width:4}}
          onClick={()=>this._onViewClicked('pter')}>
          <Image
            style={{borderRadius:2,borderWidth:0.3,borderColor:'#300',width:10,height:10,transform: [{translate: [20, 0, 20]}]}}
            source={asset('card-pter.jpg')}
          />
        </VrButton>

        <VrButton
          style={{width:4}}
          onClick={()=>this._onViewClicked('trex')}>
          <Image
            style={{borderRadius:2,borderWidth:0.3,borderColor:'#300',width:10,height:10,transform: [{translate: [-15, 10, 20]}]}}
            source={asset('card-trex.jpg')}
          />
          </VrButton>

          <VrButton
            style={{width:4}}
            onClick={()=>this._onViewClicked('brac')}>
            <Image
              style={{borderRadius:2,borderWidth:0.3,borderColor:'#300',width:10,height:10,transform: [{translate: [20, 20, -40]}]}}
              source={asset('card-brac.jpg')}
            />
          </VrButton>

          <VrButton
            style={{width:4}}
            onClick={()=>this._onViewClicked('steg')}>
            <Image
              style={{borderRadius:2,borderWidth:0.3,borderColor:'#300',width:10,height:10,transform: [{translate: [-20, 30, -40]}]}}
              source={asset('card-steg.jpg')}
            />
          </VrButton>
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => ({
    viewExhibit: bindActionCreators(viewingExhibitActions, dispatch),
});

WaitingRoomView.propTypes = {
  viewingExhibits: bool,
  state: object.isRequired,
  history: object.isRequired
};

export default (connect(state => ({
  state,
}),
mapDispatchToProps)(WaitingRoomView));
