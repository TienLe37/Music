import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../features/musicSlice";
import { FcLikePlaceholder } from "react-icons/fc";
import {
  MdAddCircleOutline,
  MdOutlineAddCircle,
  MdPlaylistAdd,
} from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import "../Style/MR.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getPlaylist } from "../features/Playlists";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

const MusicRecomendation = ({ music }) => {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  const [PlaylistName, setPlaylistName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const Playlists = useSelector((state) => state.Playlists.Playlist);

  const User = localStorage.getItem("user");
  const User_id = JSON.parse(User).id;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleGetMusic = async (song_id) => {
    try {
      await axios
        .get(`http://localhost:5002/song/SpecSong?SongId=${song_id}`, config)
        .then((res) => {
          console.log(res);
          dispatch(setSongs(res.data));
        });
    } catch (err) {
      console.log(err);
    }
  };

  const likeSong = async (song_id) => {
    try {
      await axios
        .post(
          "http://localhost:5002/LikedSong/LikedSong",
          {
            UserID: User_id,
            SongID: song_id,
          },
          config
        )
        .then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  };

  const handleToSongPage = (song_id) => {
    navigate(`/Song/${encodeURIComponent(song_id)}`);
  };

  const DisplayCreatePlaylist = () => {
    setShowCreatePlaylist(!showCreatePlaylist);
  };

  const CreatePlaylist = async (thumbnail) => {
    // Accept the Thumbnail parameter
    console.log(thumbnail);
    try {
      await axios
        .post(
          "http://localhost:5002/Playlist/CreatedPlaylist",
          { Name: PlaylistName, AuthorID: User_id, Thumbnail: thumbnail },
          config
        )
        .then((res) => {
          toast({
            title: "Playlist created",
            status: "success",
            description: `Playlist Name: ${res.data.Name}`,
            duration: 3000,
            position: "bottom-left",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const AddSongToPlaylist = async (PlaylistID, SongID) => {
    try {
      await axios
        .post(
          "http://localhost:5002/Playlist/AddSongToPlaylist",
          { PlaylistID: PlaylistID, SongID: SongID },
          config
        )
        .then((res) => {
          toast({
            status: "success",
            description: res.data,
          });
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        await axios
          .post(
            "http://localhost:5002/Playlist/GetPlaylist",
            { AuthorID: User_id },
            config
          )
          .then((res) => {
            dispatch(getPlaylist(res.data));
            console.log(res);
            console.log(Playlists);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getPlaylists();
  }, [Playlists.length]);

  return (
    <Box display={"flex"} flexDirection={"column"} maxW={'50%'}>
      <Box margin={"2em"} display={"flex"} flexDirection={"row"}>
        <Box
          className="header"
          display={"flex"}
          justifyContent={"flex-start"}
          gap={"15px"}
        >
          <Box className="header-child">
            <NavLink>Discover</NavLink>
          </Box>
          <Box className="header-child">
            <NavLink>Popular</NavLink>
          </Box>
          <Box className="header-child">
            <NavLink>Lastest</NavLink>
          </Box>
          <Box className="header-child">
            <NavLink>Trending</NavLink>
          </Box>
        </Box>
        <Box
          className="Searching"
          position={"relative"}
          left={"7em"}
          bottom={"2"}
        >
          <InputGroup>
            <InputLeftElement>
              <CiSearch color="white" />
            </InputLeftElement>
            <Input
              placeholder="Search song here"
              size="md"
              borderRadius={"20px"}
            />
          </InputGroup>
        </Box>
      </Box>
      <Box id="Trending-music" marginLeft={"2em"}>
        <Text color="#D80032">Trending Music</Text>
      </Box>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ backgroundColor: "white" }}
        width={'100%'}
      >
        {music.map((song) => (
          <SwiperSlide key={song._id}>
            <Image
              src={song.Thumbnail}
              placeholder="Thumbnail"
              boxSize={'200px'}
              borderRadius="15px"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MusicRecomendation;
