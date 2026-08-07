// Web Audio API ambient sound generator for immersive mountain & electric motor atmosphere
class AmbientAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private breezeNode: AudioNode | null = null;
  private humGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

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
      
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);

      // Pink noise for mountain wind breeze
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.audioCtx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.masterGain);
      whiteNoise.start();
      this.breezeNode = whiteNoise;

      // Subtle motor sine harmonic hum
      const osc = this.audioCtx.createOscillator();
      this.humGain = this.audioCtx.createGain();
      this.humGain.gain.setValueAtTime(0.02, this.audioCtx.currentTime);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, this.audioCtx.currentTime); // Low A hum
      osc.connect(this.humGain);
      this.humGain.connect(this.masterGain);
      osc.start();

      this.isPlaying = true;
    } catch (e) {
      console.warn('Audio context init prevented or failed', e);
      this.isPlaying = false;
    }
  }

  private stop() {
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.isPlaying = false;
  }
}

export const ambientAudio = new AmbientAudioEngine();
