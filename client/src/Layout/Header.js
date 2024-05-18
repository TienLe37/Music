//@ts-check
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  AiOutlineCloudUpload,
  AiOutlineFileSearch,
  AiOutlineSearch,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiLibrary, BiHomeCircle, BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import "../Style/Header.css";
import axios from "axios";
const Header = () => {
  const [searchSong, setSearch] = useState("");
  const navigate = useNavigate();
  const SearchSong = () => {
    navigate(`/Search/search?q=${encodeURIComponent(searchSong)}`);
  };

  const LogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <VStack
      gap="15px"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      position={"relative"}
      backgroundColor={"black"}
      height={'100vh'}
    >
      <div
        className="btn from-top"
      >
        <NavLink to="/">Home</NavLink>
      </div>
      <Box className="btn from-top">
        <NavLink to="/library">Library</NavLink>
      </Box>
      <Box className="btn from-top">
        <NavLink to="/upload">Upload</NavLink>
      </Box>
      <Box className="btn from-top">
        <NavLink to="/profile">Profile</NavLink>
      </Box>
    </VStack>
  );
};

export default Header;
