import { Button, Card, CardBody, CardHeader, Flex, Grid, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdPlaylistAdd } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setSongs } from "../features/musicSlice";
import { useDispatch } from "react-redux";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchSong = searchParams.get("q");

  const [SearchSongArrary, SetSearchSongArrary] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fetchSearchSong = async () => {
    await axios
      .post(
        "http://localhost:5002/song/SearchSong",
        { SongName: searchSong },
        config
      )
      .then((res) => {
        SetSearchSongArrary(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  const disLikedsong = async (song_id) => {
    const User = localStorage.getItem("user");
    const User_id = JSON.parse(User).id;

    await axios
      .post(
        "http://localhost:5002/LikedSong/disLikeSong",
        {
          'UserID': User_id,
          'SongID': song_id,
        }, config
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleGetMusic = async (song_id) => { // bật bài hát
    await axios
      .get(
        `http://localhost:5002/song/SpecSong?SongId=${song_id}`,
        config
      )
      .then((res) => {
        console.log(res);
        dispatch(setSongs(res.data)); // cần sửa để set song các bài hát được được like
      });
  };

  const handleToSongPage = () => {
    navigate('/Song');
  }

  useEffect(() => {
    fetchSearchSong();
  }, [searchSong]);

  return (
    <Flex margin={'5%'} >
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap="10px"
        width="80%"
      >
        {SearchSongArrary.map((song) => (
          <Card
            key={song._id}
            width="200px"
            margin="10px"
            height={{ base: "200px", md: "250px" }}
            display="flex"
            justifyContent="center"
            backgroundColor="transparent"
          >
            <CardHeader>
              <Flex
                className="image-container"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src={song.Thumbnail}
                  placeholder="Thumbnail"
                  boxSize="150px"
                  borderRadius="15px"
                  onClick={handleToSongPage}
                />
                <Flex className="button-container">
                  <Button
                    className="like-button"
                    onClick={() => {
                      disLikedsong(song._id);
                    }}
                  >
                    <FcLikePlaceholder />
                  </Button>
                  <Button className="add-to-playlist-button">
                    <MdPlaylistAdd />
                  </Button>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody mt={-2} onClick={() => handleGetMusic(song._id)}>
              <Text
                alignContent="center"
                style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                textColor="#1B9C85"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                cursor={"pointer"}
              >
                {song.titleSong}
              </Text>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Flex>
  );
};

export default SearchPage;
