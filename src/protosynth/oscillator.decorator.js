/**
 * Creation and decoration of an oscillatorNode object.
 */

export default function createOscillator(audioCtx, options = {}) {
  let oscillator = audioCtx.createOscillator();
  oscillator.type = options.type || 'sine';
  oscillator.frequency.value = options.frequency || 440;
  oscillator.detune.value = options.detune || 0;
  oscillator.glide = options.glide || false;
  oscillator.frequency.value = options.startFrequency || oscillator.frequency.defaultValue;
  
  /* Change Frequency */
  oscillator.changeFrequency = (frequency) => {
    oscillator.frequency.cancelScheduledValues(0);
    oscillator.frequency.setTargetAtTime(frequency, 0, oscillator.glide || 0.0000001);
  }

  /* Detune the osc */
  oscillator.detuneBy = (value) => {
    console.log(value);
    oscillator.detune.value = value;
  }

  return oscillator;
}
