import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const SlotMachine = ({ isSpinning, onSpinEnd, symbols = 5, reels = 3, creditsPerSpin = 5 }) => {
  // Display result for each reel
  const [slots, setSlots] = useState(Array.from({ length: reels }, () => Array.from({ length: symbols }, () => "?")));
  const [totalSpins, setTotalSpins] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  // Balance system
  const [balance, setBalance] = useState(100); // Let's say the user starts with 100 credits
  // Message display
  const [message, setMessage] = useState("");
  const [won, setWon] = useState(false); // Declare won state to track win status

  const generateSlotResult = () => slots.map((reel) => Array.from({ length: symbols }, () => Math.floor(Math.random() * symbols) + 1));

  const checkWin = (slotsArray) => {
    // Check for a win condition (e.g., all reels have the same symbol)
    return new Set(slotsArray).size === 1;
  };

  useEffect(() => {
    if (isSpinning && balance >= creditsPerSpin) {
      setTotalSpins((prev) => prev + 1);
      setBalance((prev) => prev - creditsPerSpin); // Deduct credits per spin
      const newSlots = generateSlotResult();
      setSlots(newSlots);
      const winResult = checkWin(newSlots.flat()); // Use flat() to create a single array of slot results
      setWon(winResult); // Update the won state
      if (won) {
        const winAmount = creditsPerSpin * symbols; // Example payout rate
        setTotalWins((prev) => prev + 1);
        setBalance((prev) => prev + winAmount); // Add win amount to balance
        setMessage(`Congratulations! You won ${winAmount} credits!`);
      } else {
        setMessage("Sorry, you lost. Try again!");
      }
      setTimeout(() => onSpinEnd(won), 2000); // Simulate spinning time
    }
  }, [isSpinning, onSpinEnd, reels, balance, creditsPerSpin, symbols]);

  return (
    <Flex direction="column" align="center">
      <Text fontSize="xl">Balance: {balance}</Text>
      <Text fontSize="xl">Spins: {totalSpins}</Text>
      <Text fontSize="xl">Wins: {totalWins}</Text>
      <Text fontSize="xl" color={won ? "green.500" : "red.500"} mb={4}>
        {message}
      </Text>
      <Flex>
        {slots.map((reelSlots, reelIndex) => (
          <Flex key={reelIndex} direction="column" align="center" m={1}>
            {reelSlots.map((slot, slotIndex) => (
              <Box key={slotIndex} borderWidth="1px" borderRadius="lg" p={4} width="50px" height="50px" display="flex" alignItems="center" justifyContent="center" fontSize="2xl" bg="gray.300" m={1}>
                {slot}
              </Box>
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default SlotMachine;
