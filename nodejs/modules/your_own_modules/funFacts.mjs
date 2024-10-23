// funFacts.js

const animalFacts = [
    "Dolphins sleep with one eye open to stay alert.",
    "A group of flamingos is called a 'flamboyance'.",
    "Octopuses have three hearts and blue blood.",
    "The fingerprints of a koala are nearly identical to humans.",
    "Sea otters hold hands while sleeping to keep from drifting apart.",
    "A snail can sleep for three years at a time.",
    "Elephants are the only animals that can't jump.",
    "Cows have best friends and get stressed when they are separated.",
    "The heart of a blue whale is the size of a small car.",
    "Rats laugh when they are tickled.",
    "Penguins propose to their mates with a pebble.",
    "A group of hedgehogs is called a 'prickle'.",
    "Sloths can hold their breath longer than dolphins can.",
    "Butterflies can taste with their feet.",
    "Male seahorses are the ones that carry and give birth to babies.",
    "A cheetah can accelerate from 0 to 60 mph in just a few seconds.",
    "Tigers have striped skin, not just striped fur.",
    "Sharks have been around for over 400 million years.",
    "Puffins use twigs to scratch themselves.",
    "Ostriches can run faster than horses and male ostriches can roar like lions."
  ];
  
  // Function to get a random fun fact
  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * animalFacts.length);
    return animalFacts[randomIndex];
  };
  
  // Export the function
  export default getRandomFact;
  