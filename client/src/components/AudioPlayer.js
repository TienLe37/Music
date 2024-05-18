import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setSongs } from "../features/musicSlice";
import '../Style/AudioPlayer.css'

const AudioPlayer = ({ Song }) => {

  const dispatch = useDispatch()

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };


  const handleGetMusic = async() => {
    await axios
      .get(
        `http://localhost:5002/song/SpecSong?SongId=${Song._id}`,
        config
      )
      .then((res) => {
        console.log(res);
        dispatch(setSongs(res.data));
      });
  }


  const likeSong = async (song_id) => { // like bài hàt
    const User = localStorage.getItem("user");
    const User_id = JSON.parse(User).id;

    await axios
      .post(
        "http://localhost:5002/LikedSong/LikedSong",
        {
          'UserID': User_id,
          'SongID': song_id,
        }, config
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Flex id="player" margin={4}>
      {Song && (
        <Box id="thumbnail" display="inline">
          <Image
            src={Song.Thumbnail}
            boxSize={300}
            placeholder="Song's Thumbnail"
            objectFit="cover"
            borderRadius="20px"
          />
        </Box>
      )}
      <Box id="tag-info" marginLeft={4}>
        {Song && (
          <Text
            fontSize="3xl"
            fontFamily="sans-serif"
            whiteSpace="nowrap"
            color="#1B9C85"
            overflow="hidden"
            textOverflow="ellipsis"
            width={'600px'}
          >
            {Song.titleSong}
          </Text>
        )}
        <Box>
          <Button
            leftIcon={<BsFillPlayFill />}
            borderRadius="25px"
            margin={2.5}
            width="110px"
            height="45px"
            position={'relative'}
            onClick={handleGetMusic}
            zIndex={'1'}
            className='Audio-button'
          >
            <Text fontSize="2md" fontFamily="sans-serif">
              Play
            </Text>
          </Button>
          {Song && (
            <Button
              borderRadius="100px"
              onClick={() => likeSong(Song._id)}
              className="Audio-button"
            >
              <AiOutlineHeart />
            </Button>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default AudioPlayer;
