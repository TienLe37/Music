import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Text } from "@chakra-ui/react";
import MusicRecomendation from "../components/MusicRecomendation";
import { useSelector } from "react-redux";

const MusicPage = () => {
  const [music, setMusic] = useState([]);

  const User = localStorage.getItem("user");
  const User_id = JSON.parse(User).id;

  const fetchMusic = async () => {
    const res = await axios
      .post("http://localhost:5002/song/songs", { Author_Id: User_id })
      .then((result) => {
        setMusic(result.data);
        console.log(result.data);
      });
  };

  useEffect(() => {
    fetchMusic();
  }, []);
  return (
    <Container minW={'87.8%'} height="100vh" backgroundColor="black">
      <MusicRecomendation music={music} />
    </Container>
  );
};

export default MusicPage;
