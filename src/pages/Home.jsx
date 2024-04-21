import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { CiMenuKebab } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { ProfileIcon } from "../components/ProfileIcon";

const Home = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        // sending data to axios api to getall posts  
        const { data } = await axios.get(
          "http://localhost:8080/api/posts/getAll"
        );
        setPost(data);
      };
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(post);

  //layout
  return (
    <Layout>
      <div className="bg-[#eaf4fd]  rounded-lg p-1 w-full flex justify-center min-h-screen ">
        <div className="w-[520px]">
          {post.map((p) => (
            <div key={p.id} className="bg-white p-2 m-2 rounded-lg ">
              <div className="flex justify-between">
                <div className="flex ">
                  <div className="flex items-center justify-center">
                    <ProfileIcon user={p?.author}  />
                  </div>
                  <div className="flex ml-2 flex-col">
                    <span className="font-bold uppercase text-sm">
                      {p?.author}
                    </span>
                    <span className="font-thin text-xs">{p.date}</span>
                  </div>
                </div>
                <div>
                  <button className=" text-black px-2 py-1 rounded-lg">
                    <CiMenuKebab />
                  </button>
                </div>
              </div>
              <div>
                <h1 className="text-base font-bold mt-2">{p.title}</h1>
                <p className="text-base">{p.description}</p>
              </div>
              <div className="mt-4 flex bg-gray-100 rounded-lg ">
                {p?.images?.length === 3 ? (
                  <div className="grid grid-cols-2 grid-rows-2 w-[500px] h-[510px] items-center border-gray-200 border-1">
                    {p.images.map((i) => (
                      <img
                        cla
                        key={i.id}
                        src={i}
                        alt={i}
                        className="w-100 m-1 max-h-[200px]"
                      />
                    ))}
                  </div>
                ) : p.images.length === 2 ? (
                  <div className="flex flex-col items-center w-[500px] h-[510px] border-gray-200 border-1">
                    {p.images.map((i) => {
                      console.log(i);
                      return (
                        <img
                          key={i.id}
                          src={i}
                          alt={i}
                          className="w-1/2 h-1/2 m-1 max-w-1/2 "
                        />
                      );
                    })}
                  </div>
                ) : p.images.length === 1 ? (
                  <div className="border-gray-200 border-1">
                    {p.images.map((i) => (
                      <img
                        key={i.id}
                        src={i}
                        alt={i}
                        className="w-full h-full"
                      />
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex  h-10 items-center ">
                <div className="flex-1 flex items-center justify-center cursor-pointer">
                  <AiFillLike color="blue" />
                  <span className="text-blue-500 ml-2">10</span>
                </div>
                <div className="flex-1 flex items-center justify-center cursor-pointer">
                  <FaCommentAlt color="red" />
                  <span className="text-red-500 ml-2">Comment</span>
                </div>
                <div className="flex-1 flex items-center justify-center cursor-pointer">
                  <FaShareAlt color="black" />
                  <span className="text-black ml-2">Share</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Home;
