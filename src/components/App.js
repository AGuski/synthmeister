import React from 'react';
import ReactDOM from 'react-dom';

import { Midi } from '../utils/midi';
import { ProtoSynth } from '../protosynth/protosynth';

import { Indicator } from './indicator/Indicator.component';

/**
 *  TODO: 
 * 
 */

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cmd: '',
      channel: '',
      type: '',
      note: '',
      velocity: ''
    }

    this.midi = new Midi();
    this.synth = new ProtoSynth(this.midi);

    /* MIDIMessageListener */
    window.addEventListener('midi:messagen', ({ detail: data }) => {
      this.setState({
        cmd: data.cmd,
        channel: data.channel,
        type: data.type,
      });
    });

    /* NoteOnListener */
    window.addEventListener('midi:noteOn', ({ detail: data }) => {
      this.setState({
        note: data.note,
        velocity: data.velocity
      });
    });
  }

  render() {
    return (
      <div className="main">
        <span>Cmd: {this.state.cmd}</span><br/>
        <span>Channel: {this.state.channel}</span><br/>
        <span>Type: {this.state.type}</span><br/>
        <span>Note: {this.state.note}</span><br/>
        <span>Velocity: {this.state.velocity}</span>
        <div className="indicators">
          <Indicator max="128" value={this.state.velocity} />
          <Indicator max="128" value={this.state.velocity} />
        </div>
      </div>
    );
  }
}

export default App;
