// icon
import { IoIosAddCircleOutline } from "react-icons/io";
import { ThreeCircles } from "react-loader-spinner";
import { TbEdit } from "react-icons/tb";
// react
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// index file
import { Input, Button } from "../index";
import appwriteService from "../../appwrite/config";

const CreateUpdatePin = ({ pin }) => {
  //   states
  const [error, setError] = useState("");
  const [isCreate, setIsCreate] = useState();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [prevPin, setPrevpin] = useState(null);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [fileError, setFileError] = useState("");
  const [post, setPost] = useState();

  //   redux
  const authSlice = useSelector((state) => state.authStatus);

  const { userdata, prefs } = authSlice;

  // react-router
  const { state } = useParams();
  const navigate = useNavigate();
  //   react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (state === "create") {
      setIsCreate(true);
    } else {
      setIsCreate(false);
    }

    if (state.length > 8) {
      getPostDetail();
    }
    return () => {
      setLoading(false);
    };
  }, [state, isCreate]);

  //   function's
  const getPostDetail = async () => {
    try {
      const post = await appwriteService.GetPost(state.slice(7, state.length));
      if (post) {
        setPost(post);
        const setImg = `https://fra.cloud.appwrite.io/v1/storage/buckets/66d801490026bec522c7/files/${post.image}/view?project=66d70efe003c16e69527&mode=admin`;
        setImage ? setPrevpin(setImg) : null;
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file ? file : null);
    setPrevpin(file ? URL.createObjectURL(file) : null);
  };

  const handleTagChange = (event, byAddButton) => {
    const key = event.which || event.code;
    const char = String.fromCharCode(key);
    // console.log("sdjflk", event.type, char);

    if (inputTag.length > 0) {
      if (char === " ") {
        inputTag.trim();
        inputTag === " " ? null : setTags([...tags, inputTag]);
        setInputTag("");
      }
      if (byAddButton) {
        inputTag.trim();
        inputTag === " " ? null : setTags([...tags, inputTag]);
        setInputTag("");
      }
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = async (data) => {
    setLoading(true);

    data.tag = tags;

    if (!isCreate) {
      try {
        const file = image ? await appwriteService.uploadFile(image) : null;

        if (file) {
          appwriteService.deleteFile(post.image);
          data.image = file.$id;
        } else {
          data.image = post.image;
        }
        data.status = true;
        const UpdatePin = await appwriteService.UpdatePost(post.$id, {
          ...data,
        });

        if (UpdatePin) {
          navigate("/home");
        }
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    } else {
      try {
        const file = image ? await appwriteService.uploadFile(image) : null;

        if (file === null) {
          setFileError("image is required");
          setLoading(false);
        } else {
          if (file) {
            data.image = file.$id;
            data.status = true;
            const createPin = await appwriteService.CreatePost({
              ...data,
              userId: userdata.$id,
              auther: userdata.name,
              autherDp: prefs.displayPicture,
            });

            if (createPin) {
              navigate(`/profile/${userdata.$id}`);
            }
          }
        }
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }
    console.log("Form Data: ", { ...data, image });

    // Reset form after submission
    reset();
    setTags([]);
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {isCreate ? "Create a Pin" : "Edit Pin"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            {image || post ? (
              <img
                src={prevPin}
                alt="Preview"
                className="w-full min-h-52 object-cover rounded-md mb-4"
              />
            ) : (
              <label className="w-full h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  onChange={handleImageChange}
                />
                <span className="text-gray-400">Click to upload an image</span>
              </label>
            )}
            {post && (
              <>
                <label
                  htmlFor="file-upload"
                  className="py-2 px-3 rounded-3xl  font-medium text-md mx-1 bg-red-500 text-white"
                >
                  <TbEdit />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </>
            )}
            {fileError && (
              <p className="text-red-500 text-sm mt-1">{fileError}</p>
            )}
          </div>

          {/* Title Input */}
          <div>
            <Input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`mt-1 block w-full p-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder={post ? post.title : "Enter title"}
              label=" Title"
              labelStyle="block text-sm font-medium text-gray-700"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className={`mt-1 block w-full p-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder={post ? post.description : "Enter description"}
              rows="3"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Board Dropdown */}
          <div>
            <label
              htmlFor="board"
              className="block text-sm font-medium text-gray-700"
            >
              Select Board &#40;optional&#41;
            </label>
            <select
              id="board"
              {...register("board", {
                required: "Board selection is required",
              })}
              className={`mt-1 block w-full p-2 border ${
                errors.board ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="jflsjlkajk"
            >
              {post && (
                <>
                  <option value={post ? post.board : null}>{post.board}</option>
                  <option value="none">none</option>
                </>
              )}
              {!post && <option value="none">-- Select Board --</option>}
              <option
                className={`${
                  post ? `${post.board == "inspiration" ? "hidden" : ""}` : null
                }`}
                value="inspiration"
              >
                Inspiration
              </option>
              <option
                className={`${
                  post ? `${post.board == "Travel" ? "hidden" : ""}` : null
                }`}
                value="travel"
              >
                Travel
              </option>
              <option
                className={`${
                  post ? `${post.board == "food" ? "hidden" : ""}` : null
                }`}
                value="food"
              >
                Food
              </option>
              <option
                className={`${
                  post ? `${post.board == "home-decor" ? "hidden" : ""}` : null
                }`}
                value="home-decor"
              >
                Home Decor
              </option>
            </select>
            {errors.board && (
              <p className="text-red-500 text-sm mt-1">
                {errors.board.message}
              </p>
            )}
          </div>

          {/* Tags Input */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags (Press space to add a tag)
            </label>
            <div className="flex items-center justify-between">
              <input
                type="text"
                id="tags"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder={post && !tags.length > 0 ? post.tag : "Enter tags"}
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onKeyDown={handleTagChange}
              />
              <div onClick={(e) => handleTagChange(e, true)}>
                <IoIosAddCircleOutline size={30} color="red" />
              </div>
            </div>
            <div className="flex flex-wrap mt-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => handleTagRemove(tag)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="m-auto relative"
            text={`${loading ? "" : `${isCreate ? "submit" : "Edit"}`}`}
          >
            {loading && (
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
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateUpdatePin;
