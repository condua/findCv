import React from "react";
import { Link } from "react-router-dom";
import { EnvironmentTwoTone } from "@ant-design/icons";

const positions = [
    {
        title: "Intern ReactJS",
        location: "Hồ Chí Minh",
        salary: "3tr-5tr",
        url: "/manage-candidate/InternReactJS",
        imageSrc:
            "https://logowik.com/content/uploads/images/react7473.logowik.com.webp",
    },
    {
        title: "Fresher ReactJS",
        location: "Hồ Chí Minh",
        salary: "7tr-9tr",
        url: "/manage-candidate/FresherReactJS",
        imageSrc:
            "https://logowik.com/content/uploads/images/react7473.logowik.com.webp",
    },
    {
        title: "Junior ReactJS",
        location: "Hồ Chí Minh",
        salary: "12tr-15tr",
        url: "/manage-candidate/JuniorReactJS",
        imageSrc:
            "https://logowik.com/content/uploads/images/react7473.logowik.com.webp",
    },
    {
        title: "Intern Java",
        location: "Hồ Chí Minh",
        salary: "3tr-5tr",
        url: "/manage-candidate/InternJava",
        imageSrc:
            "https://logowik.com/content/uploads/images/react7473.logowik.com.webp",
    },
    {
        title: "Fresher Java",
        location: "Hồ Chí Minh",
        salary: "7tr-10tr",
        url: "/manage-candidate/FresherJava",
        imageSrc:
            "https://logowik.com/content/uploads/images/react7473.logowik.com.webp",
    },
    {
        title: "Junior Java",
        location: "Hồ Chí Minh",
        salary: "12tr-14tr",
        url: "/manage-candidate/JuniorJava",
        imageSrc:
            "https://logowik.com/content/uploads/images/react7473.logowik.com.webp",
    },
];

const Result = () => {
    return (
        <div>
            <div className="flex w-full absolute right-[1px] mt-[-70px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 font-serif text-xl text">Recruitment</div>
            </div>
            <div className="flex flex-col h-full w-full">
                <div className="flex justify-between my-8">
                    <div className="flex max-w-lg w-96 items-center justify-center">
                        <div className=" flex w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>

                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="Search something.."
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-y-8 gap-x-4 ">
                    {positions.map((position, index) => (
                        <Link key={index} to={position.url}>
                            <div className="flex w-full h-36 bg-white rounded-xl shadow-xl hover:scale-105 transition-all ease-in-out duration-200">
                                <div className="flex justify-center w-2/5">
                                    <div className="justify-center p-8 items-center bg-center bg-contain cursor-pointer">
                                        <img
                                            alt="cava"
                                            className="w-full h-full object-cover"
                                            src={position.imageSrc}
                                        ></img>
                                    </div>
                                </div>
                                <div className="flex w-full">
                                    <div className="flex flex-col w-full p-3">
                                        <div className="flex text-lg font-sans cursor-pointer w-fit font-medium ">
                                            {position.title}
                                        </div>
                                        <div className="flex my-3 text-sm text-lime-600 font-mono font-medium">
                                            <EnvironmentTwoTone
                                                twoToneColor="#52c41a"
                                                className="mx-1"
                                            />{" "}
                                            {position.location}
                                        </div>
                                    </div>
                                    <div className="flex w-5/12 my-5 font-mono font-bold text-lime-700">
                                        {position.salary}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Result;

