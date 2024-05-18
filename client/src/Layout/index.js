import { useLocation } from "react-router-dom";
import Header from "./Header";
import "../Style/MusicPage.css";
import MusicPlayer from "../Layout/MusicPlayer";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const location = useLocation();
  const MusicTrack = useSelector((state) => state.music.MusicTrack);

  return (
    <>
      <Box display={'flex'} flexDirection={'row'}>
        {!["/login", "/register"].includes(location.pathname) && (
          <>
            <Box>
              <Header />
            </Box>
          </>
        )}
        {children}
      </Box>
      {!["/login", "/register"].includes(location.pathname) && (
          <>
            <Box id="musicPlayer">
              {MusicTrack.length > 0 ? (
                <MusicPlayer MusicTrack={MusicTrack} />
              ) : null}
            </Box>
          </>
        )}
    </>
  );
}
