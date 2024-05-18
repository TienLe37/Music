import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import { useParams } from "react-router-dom";
import RelatedTrack from "../components/RelatedTrack";
import Comment from "../components/Comment";
import axios from "axios";

const SongPage = () => {
  const { song_id } = useParams();

  const [Song, setSong] = useState(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/song/SpecSong?SongId=${song_id}`,
          config
        );
        setSong(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSong();
  }, [song_id]);

  return (
    <Flex justifyContent="center" alignItems="center">
      <VStack>
        <AudioPlayer Song={Song} />
        <Flex flexDirection='row'>
          <RelatedTrack />
          <Comment Song={Song}/>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default SongPage;
