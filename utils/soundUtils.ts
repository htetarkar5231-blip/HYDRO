export const playWaterSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const t = ctx.currentTime;

    // Oscillator for the "bloop" sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Sine wave is best for liquid sounds
    osc.type = 'sine';

    // Pitch envelope: A quick rise in pitch characteristic of a bubble/droplet
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.15);

    // Volume envelope: Quick attack, fast decay
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

    osc.start(t);
    osc.stop(t + 0.15);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export const playSuccessSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const t = ctx.currentTime;
    
    // Play a happy major arpeggio (C - E - G - High C)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'triangle'; // Triangle wave for a clearer, bell-like tone
        osc.frequency.value = freq;
        
        const startTime = t + i * 0.1;
        
        // Envelope
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
        
        osc.start(startTime);
        osc.stop(startTime + 0.5);
    });
  } catch (e) {
    console.error("Success audio failed", e);
  }
};