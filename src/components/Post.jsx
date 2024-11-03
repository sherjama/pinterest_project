// icons
import { ThreeCircles } from "react-loader-spinner";
import { TiTickOutline } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
// shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const [onSaveLoading, setOnSaveLoading] = useState();
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
    console.log("lkjslk");

    // desigined DATA
    const data = {
      userId: logedinUser.$id,
      pinId: postid,
    };

    // conditions
    if (!isSaved) {
      if (data) {
        // savepost
        try {
          setOnSaveLoading(true);
          const res = await appwriteService.addSavePost(data);
          res ? setOnSaveLoading(false) : setOnSaveLoading(true);
        } catch (error) {
          console.log("savePost :", error);
        }
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
      <div className="rounded-xl shadow-lg overflow-hidden w-3/4 max-w-[52rem] max-sm:w-[98%]  min-h-[75vh] mt-[2vw] p-2 ">
        {/* DELETE and UPDATE btn  */}
        <div className="cursor-pointer px-2 pt-4">
          {istAuther && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <BsThreeDotsVertical size={35} color="gray" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{post.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => navigate(`/creation-pin/update-${post.$id}`)}
                  >
                    {/* Edit and Delete btn  */}
                    <span>Update</span>

                    <DropdownMenuShortcut>
                      <Button
                        text={<TbEdit color="blue" size={35} />}
                        className="bg-gray-400 rounded-full rounded-bl-sm font-Primary"
                        bgColor="bg-transparnt"
                      />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={deletePost}>
                    <span>Delete</span>

                    <DropdownMenuShortcut>
                      <Button
                        text={<MdDelete color="red" size={35} />}
                        className="bg-gray-400 rounded-full rounded-bl-sm font-Primary"
                        bgColor="bg-transparnt"
                      />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {/* container  */}
        <div className="flex h-full flex-wrap  justify-center w-full">
          {/* image  */}
          <div>
            <LazyLoadImage
              onLoad={() => setIsLoading(false)}
              id={post.$id}
              src={appwriteService.getFilePreview(postImg ? postImg : null)}
              alt={`Image ${post.$id}`}
              effect="blur"
              className="w-full min-[385px]: object-contain rounded-3xl"
            />
          </div>
          {/* post details  */}
          {!isloading && (
            <div className="w-full  flex items-center justify-start">
              <div className="sm:p-6 w-full   flex flex-col min-h-96  sm:ml-5">
                {/* description and title  */}
                <div>
                  <h1 className="text-3xl font-bold mt-4 text-gray-950 font-Primary ">
                    {post.title}
                  </h1>
                  <p className="text-gray-600 font-Primary">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-10   ">
                  <div className="flex items-center ">
                    <LazyLoadImage
                      id={post.$id}
                      src={appwriteService.getFilePreview(
                        autherDP ? autherDP : null
                      )}
                      alt={`Image ${post.$id}`}
                      effect="blur"
                      className="size-12 rounded-full object-cover"
                    />
                    <div className="ml-3 ">
                      <p className="text-gray-600 underline font-Secondary text-xl ">
                        {post.auther}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3 ">
                    <Button
                      text="profile"
                      className="ml-auto  px-4 py-2 rounded-full font-Secondary"
                      onClick={() => navigate(`/profile/${post.userId}`)}
                    />
                    {/* save btn  */}
                    <Button
                      text={
                        isSaved ? `saved ` : `${onSaveLoading ? "" : "save"}`
                      }
                      className="px-4 py-2 rounded-full float-end font-Primary transition-all ease-in max-sm:hidden"
                      onClick={savePost}
                      bgColor={
                        isSaved ? "bg-green-600 uppercase" : "bg-gray-500"
                      }
                    >
                      {onSaveLoading && (
                        <ThreeCircles
                          visible={true}
                          height="30"
                          width="30"
                          color="#ffff"
                          ariaLabel="three-circles-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      )}
                      {isSaved ? <TiTickOutline /> : null}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* explore btn  */}
        {!isloading && (
          <div className="p-4  flex justify-end relative bottom-0 flex-wrap">
            <Button
              text="More to explore"
              className="px-4 py-2 rounded-full float-end font-Primary"
              bgColor="bg-gray-950"
              onClick={() => navigate("/home")}
            />
            {/* save btn  */}
            <Button
              text={isSaved ? `saved ` : `${onSaveLoading ? "" : "save"}`}
              className="px-4 py-2 rounded-full float-end font-Primary transition-all ease-in sm:hidden"
              onClick={savePost}
              bgColor={isSaved ? "bg-green-600 uppercase" : "bg-gray-500"}
            >
              {onSaveLoading && (
                <ThreeCircles
                  visible={true}
                  height="30"
                  width="30"
                  color="#ffff"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
              {isSaved ? <TiTickOutline /> : null}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
