import React from "react";
import images from "../utils/Images.jsx";
import TestEx from "./TestEx.jsx";

const Start = () => {
  console.log(images.StartImg)
  return (
    <div className="min-h-screen relative w-full bg-[#D9F3FE] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src={images.cloud1} className="absolute top-[22%] right-0" />
        <img src={images.cloud2} className="absolute bottom-[40%]" />
      </div>
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen">
        <p
          className="UhBee text-xl bg-[#00B7FF] mb-8 p-2 pb-3 px-12 border-2"
          style={{
            textShadow: `
      -1px -1px 0 white,
      1px -1px 0 white,
      -1px  1px 0 white,
      1px  1px 0 white
    `,
          }}>
          나는 어떤 신데렐라일까?
        </p>
        <div className="w-full flex flex-col justify-center items-center text-center">
          <div className="p-[7px] mx-auto w-[72%] bg-white rounded-[24px] border-2">
            <div className="bg-[#AFE8FF] p-6 rounded-[20px] py-7">
              <div className="bg-white p-4 py-5 rounded-2xl border-2">
                <img src={images.StartImg} className="ml-[3px]" />
              </div>
            </div>
          </div>
          <div>
            <p className="Title text-[13px] my-8">
              신데렐라가 잃어버린 유리구두,
              <br />
              단순한 실수였을까, 아니면 운명이었을까?
              <br />
              <br />
              만약 그 신데렐라가 바로 너라면,
              <br />
              어떤 성격의 신데렐라였을지 궁금하지 않아? 👠
              <br />
              <br />
              지금부터 너만의 신데렐라 유형을 알아보자!
            </p>
            <div className="flex flex-col gap-5 Regular text-[15px]">
              <button className="bg-[#0073FF] p-3 mx-5 rounded-2xl text-white">
                시작하기 →
              </button>
              <button className="bg-[#272727] p-3 mx-5 rounded-2xl text-white">
                제작자 →
              </button>
              <TestEx />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
