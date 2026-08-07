// Web Audio API dynamic audio engine generating an authentic high-performance e-MTB electric motor whir, torque rumble, and trail atmosphere
class AmbientAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private motorOsc1: OscillatorNode | null = null;
  private motorOsc2: OscillatorNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private start() {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();

      const now = this.audioCtx.currentTime;

      // Master output gain with smooth 1.2s fade-in
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.22, now + 1.2);
      this.masterGain.connect(this.audioCtx.destination);

      // --- 1. PINE FOREST CANOPY & DIRT TRAIL NOISE ---
      const bufferSize = this.audioCtx.sampleRate * 3;
      const noiseBuffer = this.audioCtx.createBuffer(2, bufferSize, this.audioCtx.sampleRate);
      const leftChannel = noiseBuffer.getChannelData(0);
      const rightChannel = noiseBuffer.getChannelData(1);

      let b0L = 0, b1L = 0, b2L = 0, b3L = 0, b4L = 0, b5L = 0;
      let b0R = 0, b1R = 0, b2R = 0, b3R = 0, b4R = 0, b5R = 0;

      for (let i = 0; i < bufferSize; i++) {
        const whiteL = Math.random() * 2 - 1;
        b0L = 0.99886 * b0L + whiteL * 0.0555179;
        b1L = 0.99332 * b1L + whiteL * 0.0750759;
        b2L = 0.96900 * b2L + whiteL * 0.1538520;
        b3L = 0.86650 * b3L + whiteL * 0.3104856;
        b4L = 0.55000 * b4L + whiteL * 0.5329522;
        b5L = -0.7616 * b5L - whiteL * 0.0168980;
        leftChannel[i] = (b0L + b1L + b2L + b3L + b4L + b5L) * 0.045;

        const whiteR = Math.random() * 2 - 1;
        b0R = 0.99886 * b0R + whiteR * 0.0555179;
        b1R = 0.99332 * b1R + whiteR * 0.0750759;
        b2R = 0.96900 * b2R + whiteR * 0.1538520;
        b3R = 0.86650 * b3R + whiteR * 0.3104856;
        b4R = 0.55000 * b4R + whiteR * 0.5329522;
        b5R = -0.7616 * b5R - whiteR * 0.0168980;
        rightChannel[i] = (b0R + b1R + b2R + b3R + b4R + b5R) * 0.045;
      }

      this.noiseNode = this.audioCtx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const windFilter = this.audioCtx.createBiquadFilter();
      windFilter.type = 'lowpass';
      windFilter.frequency.setValueAtTime(320, now);

      // Low frequency modulation on wind cutoff
      const windLfo = this.audioCtx.createOscillator();
      windLfo.type = 'sine';
      windLfo.frequency.setValueAtTime(0.18, now);
      const windLfoGain = this.audioCtx.createGain();
      windLfoGain.gain.setValueAtTime(140, now);

      windLfo.connect(windLfoGain);
      windLfoGain.connect(windFilter.frequency);
      windLfo.start(now);

      const windGain = this.audioCtx.createGain();
      windGain.gain.setValueAtTime(0.35, now);

      this.noiseNode.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.masterGain);
      this.noiseNode.start(now);

      // --- 2. HIGH-PERFORMANCE E-MOTOR DRIVE WHINE ---
      // LFO simulating trail acceleration & cadence variations (~8s loop)
      this.lfo = this.audioCtx.createOscillator();
      this.lfo.type = 'triangle';
      this.lfo.frequency.setValueAtTime(0.12, now);

      const motorPitchGain = this.audioCtx.createGain();
      motorPitchGain.gain.setValueAtTime(160, now);
      this.lfo.connect(motorPitchGain);

      // Fundamental E-Motor Stator Tone (Triangle for crisp electric character)
      this.motorOsc1 = this.audioCtx.createOscillator();
      this.motorOsc1.type = 'triangle';
      this.motorOsc1.frequency.setValueAtTime(240, now);
      motorPitchGain.connect(this.motorOsc1.frequency);

      // High Inverter Whine
      this.motorOsc2 = this.audioCtx.createOscillator();
      this.motorOsc2.type = 'sine';
      this.motorOsc2.frequency.setValueAtTime(768, now);

      const inverterPitchGain = this.audioCtx.createGain();
      inverterPitchGain.gain.setValueAtTime(512, now);
      this.lfo.connect(inverterPitchGain);
      inverterPitchGain.connect(this.motorOsc2.frequency);

      // Bandpass filter representing the carbon motor casing resonance
      const motorFilter = this.audioCtx.createBiquadFilter();
      motorFilter.type = 'bandpass';
      motorFilter.frequency.setValueAtTime(1100, now);
      motorFilter.Q.setValueAtTime(2.2, now);

      const motorGain = this.audioCtx.createGain();
      motorGain.gain.setValueAtTime(0.07, now);

      // Modulate motor volume dynamically with acceleration
      const motorVolumeLfoGain = this.audioCtx.createGain();
      motorVolumeLfoGain.gain.setValueAtTime(0.03, now);
      this.lfo.connect(motorVolumeLfoGain);
      motorVolumeLfoGain.connect(motorGain.gain);

      this.motorOsc1.connect(motorFilter);
      this.motorOsc2.connect(motorFilter);
      motorFilter.connect(motorGain);
      motorGain.connect(this.masterGain);

      this.motorOsc1.start(now);
      this.motorOsc2.start(now);

      // --- 3. 120Nm TORQUE SUB-BASS RUMBLE ---
      const subOsc = this.audioCtx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(50, now);

      const subGain = this.audioCtx.createGain();
      subGain.gain.setValueAtTime(0.1, now);

      subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start(now);

      this.lfo.start(now);

      this.isPlaying = true;
    } catch (e) {
      console.warn('Audio context init prevented or failed', e);
      this.isPlaying = false;
    }
  }

  private stop() {
    if (this.audioCtx && this.masterGain) {
      try {
        const now = this.audioCtx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        setTimeout(() => {
          if (this.audioCtx) {
            this.audioCtx.close();
            this.audioCtx = null;
          }
        }, 550);
      } catch {
        if (this.audioCtx) {
          this.audioCtx.close();
          this.audioCtx = null;
        }
      }
    } else if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.isPlaying = false;
  }
}

export const ambientAudio = new AmbientAudioEngine();

