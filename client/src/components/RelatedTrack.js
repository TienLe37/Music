import { Box, Flex, HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import React from "react";

const RelatedTrack = () => {
  return (
    <Flex flexDirection={'column'} padding={'10px'} position={'relative'} left={'7%'}>
      <Text fontSize={'2xl'} padding={'10px'} fontFamily={'sans-serif'}>Related Track</Text>
      <VStack spacing={2}>
        <Skeleton height="50px"  width='300px'/>
        <Skeleton height="50px"  width='300px'/>
        <Skeleton height="50px"  width='300px'/>
        <Skeleton height="50px"  width='300px'/>
        <Skeleton height="50px"  width='300px'/>
      </VStack>
    </Flex>
  );
};

export default RelatedTrack;
