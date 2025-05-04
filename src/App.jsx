// loader
import LoadingBar from "react-top-loading-bar";
// react
import React, { useEffect, useState } from "react";
// index file
import { Header, Footer } from "./components/index";
// router-dom
import { Outlet, useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addPins, saved, displaySaved } from "./store/pinSlice";
import { setLoading } from "./store/loadSlice";
// appwrite
import appwriteService from "./appwrite/config";
import { Query } from "appwrite";

const App = () => {
  // states
  const [progress, setProgress] = useState(60);
  const [pins, setPins] = useState([]);
  const [savedPins, setsavedPins] = useState([]);
  const [savePostData, setSavePostData] = useState([]);
  const [userId, setuserId] = useState();
  // redux
  const { status, userdata } = useSelector((state) => state.authStatus);

  const saved_posts = useSelector((state) => state.pins.savedPins);

  const isLoaded = useSelector((state) => state.Loading.isLoading);

  const dispatch = useDispatch();

  // router-dom
  const navigate = useNavigate();

  // useEffect's
  // 1. Fetch user-related data on login
  useEffect(() => {
    const fetchData = async () => {
      if (status && userdata?.$id) {
        const id = userdata.$id;
        setuserId(id);

        const posts = await appwriteService.ListPosts();
        if (posts) setPins(posts);

        const saved = await appwriteService.ListSavePosts(id);
        if (saved.total >= 0) setsavedPins(saved);
      }

      if (!status) {
        navigate("/auth/login");
      }
    };

    fetchData();
  }, [status, userdata, navigate]);

  // 2. Dispatch pins to redux when loaded
  useEffect(() => {
    if (pins) {
      dispatch(addPins(pins));
    }
  }, [pins, dispatch]);

  // 3. Dispatch saved pins to redux when loaded
  useEffect(() => {
    if (savedPins?.total >= 0) {
      dispatch(saved(savedPins));
    }
  }, [savedPins, dispatch]);

  // useEffect(() => {
  //   if (status) {
  //     setuserId(userdata.$id);
  //     // pins
  //     appwriteService.ListPosts().then((posts) => {
  //       posts ? setPins(posts) : null;
  //     });

  //     // savedPins By user
  //     appwriteService.ListSavePosts(userId).then((posts) => {
  //       posts.total >= 0 ? setsavedPins(posts) : null;
  //     });
  //   }

  //   if (pins) {
  //     dispatch(addPins(pins));
  //   }

  //   if (savedPins.total >= 0) {
  //     dispatch(saved(savedPins));
  //   }

  //   if (!status) {
  //     navigate("/auth/login");
  //   }
  // }, [pins, setPins]);

  useEffect(() => {
    if (status) {
      savedPost();
    }
  }, [saved_posts]);

  useEffect(() => {
    if (!isLoaded) {
      setProgress(100);
    }

    return () => {
      dispatch(setLoading(true));
    };
  }, [isLoaded]);

  // functions
  const savedPost = async () => {
    console.log("ch");

    const pinIDS = saved_posts.map((item) => item.pinId);

    if (pinIDS.length > 0) {
      try {
        const data = await appwriteService
          .ListPosts([Query.equal("$id", pinIDS)])
          .then((post) =>
            post.total >= 0
              ? setSavePostData(post.documents)
              : setSavePostData([])
          );
        if (savePostData.length >= 0) {
          dispatch(displaySaved(savePostData));
        }
      } catch (error) {
        return;
      }
    } else {
      setSavePostData([]);
    }
  };

  return (
    <>
      <div className="w-full h-screen ">
        {status && (
          <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
        )}
        <Header className="w-full h-[12%] z-50 fixed top-0 bg-white" />
        <div className="w-full h-[12%]"></div>
        <main className="w-full min-h-min ">
          <Outlet />
        </main>
        <Footer className="" />
      </div>
    </>
  );
};

export default App;
