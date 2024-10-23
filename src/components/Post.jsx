// icons
import { TiTickOutline } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
// react
import React, { useEffect, useState } from "react";
// index file
import { Button } from "../components/index";
// lazy load image
import { LazyLoadImage } from "react-lazy-load-image-component";
// appwrite
import appwriteService from "../appwrite/config";
// react-router-dom
import { useNavigate, useParams } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../store/loadSlice";

const Post = () => {
  // states
  const [isloading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  const [autherDP, setAutherDP] = useState();
  const [istAuther, setIstAuther] = useState();
  const [postImg, setPostImg] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const { postid } = useParams();

  // redux
  const dispatch = useDispatch();
  const logedinUser = useSelector((state) => state.authStatus.userdata);
  const saved_posts = useSelector((state) => state.pins.savedPins);

  // router-dom
  const navigate = useNavigate();

  // useEffect's
  useEffect(() => {
    postid
      ? appwriteService
          .GetPost(postid)
          .then((res) => (res ? setPost(res) : null))
      : null;

    checkIsSaved();
  }, [saved_posts]);

  useEffect(() => {
    setAutherDP(post.autherDp);
    setPostImg(post.image);
    if (post) {
      if (post.userId == logedinUser.$id) {
        setIstAuther(true);
      } else {
        setIstAuther(false);
      }
    }
  }, [post, setPost]);

  useEffect(() => {
    if (!isloading) {
      dispatch(setLoading(false));
    }
    return () => {
      dispatch(setLoading(true));
    };
  }, [isloading]);

  // functions
  const deletePost = async () => {
    // first we unsave the post then delete it
    await unSavePost();
    try {
      await appwriteService
        .deleteFile(post.image)
        .then(await appwriteService.DeletePost(post.$id))
        .then(navigate(`/profile/${post.userId}`));
    } catch (error) {
      alert(error.message);
      console.log("component Post :", error);
    }
  };

  const unSavePost = async () => {
    if (isSaved) {
      const check = saved_posts.filter((item) => item.pinId == postid);

      if (check) {
        await appwriteService.DeleteSavedPost(check[0].$id);
      }
    }
  };

  const savePost = async () => {
    // desigined DATA
    const data = {
      userId: logedinUser.$id,
      pinId: postid,
    };

    // conditions
    if (!isSaved) {
      if (data) {
        // savepost
        await appwriteService.addSavePost(data);
      }
    } else if (isSaved) {
      // unsave post
      unSavePost();
    }
  };

  const checkIsSaved = () => {
    const save = saved_posts.map((item) =>
      item.pinId == postid ? true : false
    );

    if (save.includes(true)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-3/4 min-w-96 min-h-[75vh] mt-[2vw] ">
        <div className="flex h-full flex-wrap items-center justify-evenly ">
          {/* image  */}
          <div className="max-h-full  mt-[1vw] ">
            <LazyLoadImage
              onLoad={() => setIsLoading(false)}
              id={post.$id}
              src={appwriteService.getFilePreview(postImg ? postImg : null)}
              alt={`Image ${post.$id}`}
              effect="blur"
              className="w-full size-96 object-contain rounded-3xl"
            />
          </div>
          {/* post details  */}
          {!isloading && (
            <div className="p-6  w-96  flex flex-col min-h-96 ">
              {istAuther && (
                <div className="flex space-x-3 justify-end">
                  <Button
                    text={<TbEdit />}
                    className="bg-gray-400 text-white px-4 py-2 rounded-full float-end font-Primary"
                    bgColor="bg-gray-500"
                    onClick={() => navigate(`/creation-pin/update-${post.$id}`)}
                  />
                  <Button
                    text={<MdDelete />}
                    className="bg-gray-400 text-white px-4 py-2 rounded-full float-end font-Primary"
                    onClick={deletePost}
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold mt-4 font-Primary ">
                  {post.title}
                </h1>
                <p className="text-gray-600 font-Primary">{post.description}</p>
              </div>
              <div className="flex items-center justify-between mt-10 ">
                <div className="flex items-center">
                  <LazyLoadImage
                    id={post.$id}
                    src={appwriteService.getFilePreview(
                      autherDP ? autherDP : null
                    )}
                    alt={`Image ${post.$id}`}
                    effect="blur"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-2 ">
                    <p className="text-gray-800 font-Secondary">
                      {post.auther}
                    </p>
                    {/* <p className="text-gray-500 text-sm">578 followers</p> */}
                  </div>
                </div>
                <Button
                  text="profile"
                  className="ml-auto  px-4 py-2 rounded-full font-Secondary"
                  onClick={() => navigate(`/profile/${post.userId}`)}
                />
              </div>
            </div>
          )}
        </div>
        {!isloading && (
          <div className="p-4 text-center text-gray-500 flex justify-evenly  relative bottom-0 ">
            <div className="w-2/4 flex justify-start items-center ">
              <Button
                text="More to explore"
                className="px-4 py-2 rounded-full float-end font-Primary"
                bgColor="bg-gray-500"
                onClick={() => navigate("/home")}
              />
            </div>

            <div className=" w-2/4 flex justify-end items-center">
              <Button
                text={isSaved ? `saved ` : "save"}
                className="px-4 py-2 rounded-full float-end font-Primary transition-all ease-in"
                onClick={savePost}
                bgColor={isSaved ? "bg-green-600 uppercase" : "bg-red-600"}
              >
                {isSaved ? <TiTickOutline /> : null}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
