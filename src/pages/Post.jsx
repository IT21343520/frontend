import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../db/firebaseConf";
import axios from "axios";
import { toast } from "react-hot-toast";

const storage = getStorage(app);

const formSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const Post = () => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    setUser(user);

    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 3) {
      setError("images", {
        type: "manual",
        message: "Maximum of 3 images allowed",
      });
    } else {
      clearErrors("images");
      setImages([...selectedFiles]);
    }
  }
  console.log(errors);

  const onSubmit = async (data) => {
    if (user) {
      const imageUrls = [];
      for (const image of images) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }
      const postData = {
        ...data,
        images: imageUrls,
        authorId: user.id,
        author: user.username,
      };

      try {
        await axios.post("http://localhost:8080/api/posts/add", postData);

        toast.success("Post created successfully");
      } catch (error) {
        if (error?.response) {
          console.log(error.response.data.message);
          toast.error(error?.response?.data?.message);
        } else {
          console.log(error);
          toast.error("Something went wrong");
        }
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col w-full bg-[#eaf4fd] h-full rounded-lg justify-center items-center">
        <h1 className="text-2xl font-bold -mt-20">Create Post</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" max-sm:px-10 w-[500px] mt-10 bg-white px-5 py-10 rounded-lg border-2 border-gray-200"
        >
          <div className=" h-[100%] gap-3 flex flex-col rounded-lg p-1 w-full">
            <Input
              size="md"
              variant="filled"
              type="text"
              className="text-sm "
              placeholder="Title"
              label="Title"
              {...register("title")}
              isInvalid={errors.title}
              errorMessage={errors.title?.message}
            />
            <Textarea
              size="md"
              variant="filled"
              type="text"
              label="Description"
              className="text-sm "
              placeholder="Description"
              {...register("description")}
              isInvalid={errors.description}
              errorMessage={errors.description?.message}
            />
            <Input
              type="file"
              multiple
              className="text-sm"
              size="md"
              label="Images"
              variant="filled"
              placeholder="Images"
              accept="image/*"
              max={3}
              {...register("images")}
              isInvalid={errors.images}
              errorMessage={errors.images?.message}
              onChange={onImageChange}
            />

            <div className="flex gap-2 w-[500px]">
              {imageURLs.map((imageSrc, index) => (
                <img
                  key={index}
                  className="mt-3 flex items-center justify-center w-[100px] h-[100px] bg-gray-200 rounded-lg"
                  src={imageSrc}
                  alt="not found"
                  width={"250px"}
                />
              ))}
            </div>

            <Button
              type="submit"
              size="sm"
              className="bg-black text-white mt-5"
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default Post;
