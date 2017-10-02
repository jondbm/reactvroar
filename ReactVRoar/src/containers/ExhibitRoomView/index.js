import React from "react";
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Image,
  Model,
  AmbientLight,
  DirectionalLight,
  PointLight,
  SpotLight
} from 'react-vr';
import { func, bool, object } from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as viewingExhibitActions from "../../actions/Exhibition";
// import { setUsername } from "../../actions";
// import NavButton from "../../components/NavButton";

class ExhibitRoomView extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    let exhibid = this.props.state.exhibition.exhibitId;
     let dinarray  = {
      brac: {
        name:'Brachiosaurus',
        description:'Brachiosaurus had a disproportionately long neck, small skull, and large overall size, all of which are typical for sauropods. However, the proportions of Brachiosaurus are unlike most sauropods: the forelimbs were longer than the hindlimbs, which resulted in a steeply inclined trunk, and its tail was shorter in proportion to its neck than other sauropods of the Jurassic.',
        material:'Brac.mtl',
        object:'Brac.obj',
        transform: { transform : [   {translate : [-5, -10, -25]}, { scale : 5}, {rotateY : 90}, {rotateX :-90 } ] }
      },
      trex: {
        name:'Tyrannosaurus',
        description:'Like other tyrannosaurids, Tyrannosaurus was a bipedal carnivore with a massive skull balanced by a long, heavy tail. Relative to its large and powerful hind limbs, Tyrannosaurus fore limbs were short but unusually powerful for their size and had two clawed digits. ',
        material:'trex.mtl',
        object:'trex.obj',
        transform: { transform : [   {translate : [-5, -10, -25]}, { scale : 5}, {rotateY : 45}, {rotateX : 0} ] }
      },
      pter: {
        name:'Pterodactyl',
        description:'Pterodactyls were carnivores and probably preyed upon fish and other small animals. Like all pterosaurs, Pterodactyls had wings formed by a skin and muscle membrane stretching from its elongated fourth finger to its hind limbs. ',
        material:'pter.mtl',
        object:'pter.obj',
        transform: { transform : [   {translate : [-5, 20, -25]}, { scale : 0.1}, {rotateY : 45}, {rotateX : 0} ] } 
      },
      steg: {
        name:'Stegosaurus',
        description:'These were large, heavily built, herbivorous quadrupeds with rounded backs, short fore limbs, long hind limbs, and tails held high in the air. Due to their distinctive combination of broad, upright plates and tail tipped with spikes, Stegosaurus is one of the most recognizable kinds of dinosaur.',
        material:'steg.mtl',
        object:'steg.obj',
        transform: { transform : [   {translate : [-5, -10, -25]}, { scale : 8}, {rotateY : 90}, {rotateX : 0} ] }
      },

    }
    this.setState({
      textColor:'#185907',
      cardOpacity:0,
      dino: dinarray[exhibid]
    });
  }

  goHome() {
    this.props.history.push("/");
  }


  _onViewClicked() {
    let cardap = this.state.cardOpacity === 1 ? 0 : 1;
    this.setState({cardOpacity:cardap})
  }

  render() {

  return (
    <View>
      <Pano source={asset('landscape.jpg')}/>
      <AmbientLight/>
      <PointLight style={{color:'white', transform:[{translate:[0,10,-1]}]}}/>
      <DirectionalLight style={{color:'green'}}/>
      <Model
        lit={true}
        style={this.state.dino.transform}
        source={{
          obj: asset(this.state.dino.object),
          mtl: asset(this.state.dino.material),
        }}
      />
      <Text
        style={{
          fontSize: 0.8,
          layoutOrigin: [0.5, 0.5],
          transform: [{translate: [0, 2, -3]}],
          color: this.state.textColor
        }}>
      {this.state.dino.name}
      </Text>
           
      <VrButton
        style={{width:2}}
        onClick={()=>this._onViewClicked()}>
        <View style={{
          width:0.2,
          alignItems:'flex-start',
          backgroundColor:'#fff',
          borderRadius:0.1,
          opacity:1,
          borderWidth:0.02,
          padding:0.01,
          transform: [{translate: [2, 2, -3]}] }}>
          <Text style={{ fontSize:0.3,color:'#000'}}>i</Text>
        </View>
      </VrButton>

      <View style={{
        width:5,
        flex:1,
        alignItems:'flex-start',
        backgroundColor:'#fff',
        borderRadius:0.1,
        opacity:this.state.cardOpacity,
        borderWidth:0.05,
        padding:0.2,
        transform: [{translate: [0, 0, -5]}]
      }}>
      <Text style={{ fontSize:0.3,color:'#000'}}>This dinosaur is really cool it roamed the earth for a long time</Text>
      </View>
      <VrButton onClick={()=>this.goHome()}>
        <View style={{
          width:1.2,
          flex:1,
          alignItems:'flex-start',
          backgroundColor:'#fff',
          borderRadius:0.1,
          opacity:1,
          borderWidth:0.05,
          padding:0.1,
        layoutOrigin: [0.5, 0.5],
          transform: [{translate: [-4, 0, -5]}]
        }}>
        <Text style={{ fontSize:0.3,color:'#000'}}>Home</Text>
        </View>
      </VrButton>
    </View>
    );
  }
}


const mapDispatchToProps = dispatch => ({
    viewExhibit: bindActionCreators(viewingExhibitActions, dispatch),
});

ExhibitRoomView.propTypes = {
  viewingExhibits: bool,
  state: object.isRequired,
  history: object.isRequired
};

export default (connect(state => ({
  state,
}),
mapDispatchToProps)(ExhibitRoomView));

