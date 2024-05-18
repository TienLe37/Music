import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaBell } from "react-icons/fa";

function Profile() {
  const User = localStorage.getItem("user");
  const User_Name = JSON.parse(User).username;

  return (
    <Box width="100%">
      <HStack
        width={"inherit"}
        spacing={"10px"}
        display={"flex"}
        justifyContent={"flex-end"}
        padding={"2%"}
      >
        <Button
          borderRadius={"20px"}
          backgroundColor={"black"}
          textColor={"white"}
        >
          Premium
        </Button>
        <Button borderRadius={"20px"}>Install app</Button>
        <Button borderRadius={"full"}>
          <FaBell />
        </Button>
        <Button></Button>
      </HStack>
      <HStack padding={"10px"}>
        <Image
          src="https://via.placeholder.com/50"
          height={"23%"}
          width={"23%"}
          borderRadius={"50%"}
        />
        <VStack spacing={"2%"} padding={'4'}>
          <Text textColor={"black"}>Profile</Text>
          <Text fontSize={'4xl'}>{User_Name}</Text>
        </VStack>
      </HStack>
      
    </Box>
  );
}

export default Profile;
