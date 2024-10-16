// icons
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
import { useSelector } from "react-redux";

const Post = () => {
  // states
  const [post, setPost] = useState({});
  const [autherDP, setAutherDP] = useState();
  const [istAuther, setIstAuther] = useState();
  const [postImg, setPostImg] = useState();
  const { postid } = useParams();

  // redux
  const logedinUser = useSelector((state) => state.authStatus.userdata);

  // router-dom
  const navigate = useNavigate();

  // useEffect's

  useEffect(() => {
    postid
      ? appwriteService
          .GetPost(postid)
          .then((res) => (res ? setPost(res) : null))
      : null;
  }, []);

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
    console.log(istAuther);
  }, [post, setPost]);

  // functions
  const deletePost = async () => {
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

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-3/4 min-w-96 min-h-[75vh] mt-[2vw] ">
        <div className="flex h-full flex-wrap items-center justify-evenly ">
          {/* image  */}
          <div className="max-h-full  mt-[1vw] ">
            <LazyLoadImage
              id={post.$id}
              src={appwriteService.getFilePreview(postImg ? postImg : null)}
              alt={`Image ${post.$id}`}
              effect="blur"
              className="w-full size-96 object-contain rounded-3xl"
            />
          </div>
          {/* post details  */}
          <div className="p-6  w-96  flex flex-col min-h-96 ">
            {istAuther && (
              <div className="flex space-x-3 justify-end">
                <Button
                  text={<TbEdit />}
                  className="bg-gray-400 text-white px-4 py-2 rounded-full float-end font-Primary"
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
              {" "}
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
                  <p className="text-gray-800 font-Secondary">{post.auther}</p>
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
        </div>
        <div className="p-4 text-center text-gray-500 flex justify-center space-x-10 relative bottom-0">
          <Button
            text="More to explore"
            className="bg-gray-400 text-white px-4 py-2 rounded-full float-end font-Primary"
            onClick={() => navigate("/home")}
          />

          <Button
            text="Save"
            className="bg-red-600 text-white px-4 py-2 rounded-full float-end font-Primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
