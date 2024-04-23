import React from "react";
import { Flex, Box, Text, Link, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem" bg="gray.800" color="white" boxShadow="sm" _hover={{ bg: "gray.700" }}>
      <Flex align="center" mr={5}>
        <Text fontSize="xl" fontWeight="bold" letterSpacing="wider">
          Double Diamond Casino
        </Text>
      </Flex>

      <HStack spacing={8} alignItems="center">
        <Link as={NavLink} to="/" style={({ isActive }) => ({ textDecoration: "none", fontWeight: isActive ? "bold" : "normal" })} aria-label="Home">
          Home
        </Link>
        // The link to Real Pokies has been removed since the page no longer exists
        <Link as={NavLink} to="/favorites" aria-label="Favorites">
          Favorites
        </Link>
        <Link as={NavLink} to="/pokies" aria-label="Pokies">
          Pokies
        </Link>
      </HStack>
    </Flex>
  );
};

export default Navigation;
