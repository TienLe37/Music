import {
  Avatar,
  Box,
  Flex,
  Input,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import '../Style/AudioPlayer.css'

const User = localStorage.getItem("user");

const Comment = ({ Song }) => {
  const toast = useToast();

  const [Comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [userComment, setUserComment] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getComments = async () => {
    if (Song && Song._id) {
      try {
        await axios
          .post(
            "http://localhost:5002/comment/GetComment",
            { SongId: Song._id },
            config
          )
          .then((res) => {
            setComments(res.data);
            console.log(Comments);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const CreateComment = async () => {
    const User_id = JSON.parse(User).id;
    if (userComment !== null) {
      await axios
        .post(
          "http://localhost:5002/comment/CreateComment",
          {
            UserCommentId: User_id,
            SongId: Song._id,
            Content: userComment,
          },
          config
        )
        .then((res) => {
          getComments();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "Empty comment",
        status: "error",
        description: "You must enter a comment",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getComments();
  }, [Song]);

  return (
    <Flex
      marginTop={"10px"}
      flexDirection={"column"}
      width={"3xl"}
      position={"relative"}
      left={"10%"}
    >
      <Text fontSize={"2xl"} fontFamily={"sans-serif"}>
        Comment
      </Text>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
      >
        <Avatar src="https://via.placeholder.com/50" margin={"10px"} />
        <Input
          type="text"
          size="md"
          placeholder="Comment to this song"
          onChange={(e) => {
            setUserComment(e.target.value);
          }}
          required
        />
        <Button maxW={"3em"} margin={"10px"} onClick={CreateComment} backgroundColor={'transparent'} zIndex={'1'} overflow={"hidden"} position={'relative'} className="Audio-button">
          <AiOutlineSend />
        </Button>
      </Flex>
      <Flex
        width={"600px"}
        height={"500px"}
        flexDirection={"column"}
        position={"relative"}
        left={"1.5"}
        marginTop={"5"}
      >
        {Comments.map((comment) => {
          return (
            <Flex
              flexDirection={"row"}
              key={comment._id}
              margin={"3px"}
              height={"70px"}
              maxW={"3xl"}
            >
              <Avatar src="https://via.placeholder.com/25" margin={"5px"} />
              <Flex style={{ flexDirection: "column" }} height={"fit-content"}>
                <Flex flexDirection={"row"}>
                  <Text fontSize={'1xl'} fontFamily={'sans-serif'}>{comment.UserCommentId.username}</Text>
                  <Text fontSize={'md'} fontFamily={'sans-serif'} position={'relative'} left={'160%'}>{comment.CreatedAt}</Text>
                </Flex>
                <Text
                  display={"flex"}
                  alignItems={"center"}
                  height={"fit-content"}
                >
                  {comment.Content}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Comment;
