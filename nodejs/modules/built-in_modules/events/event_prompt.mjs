import { EventEmitter } from 'events';
import readline from 'readline/promises';

//EventEmitter allows creation of custom events to attach listeners to them

const eventEmitter = new EventEmitter();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//scream handler for scream event
eventEmitter.on('scream', () => { console.log("I hear a scream!") });

//attach whisper handler to whisper event
eventEmitter.on('whisper', () => { console.log("I hear a whisper...") });

//attach quit handler to quit event
eventEmitter.on('quit', () => { 
  console.log("Goodbye!") 
  rl.close();
});

rl.setPrompt('What event would you like to activate?\n');
rl.prompt();

rl.on('line', (response) => {
  eventEmitter.emit(response);
});
