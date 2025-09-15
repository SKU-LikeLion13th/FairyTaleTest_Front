import React, { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { decodeData } from "../utils/b64";
import images from "../utils/Images.jsx";
import Present from "./Present.jsx";

const MBTI_IMAGES = {
  ENFJ: images.ENFJ,
  ENFP: images.ENFP,
  ENTJ: images.ENTJ,
  ENTP: images.ENTP,
  ESFJ: images.ESFJ,
  ESFP: images.ESFP,
  ESTJ: images.ESTJ,
  ESTP: images.ESTP,
  INFJ: images.INFJ,
  INFP: images.INFP,
  INTJ: images.INTJ,
  INTP: images.INTP,
  ISFJ: images.ISFJ,
  ISFP: images.ISFP,
  ISTJ: images.ISTJ,
  ISTP: images.ISTP,
};

const Result = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const encoded = params.get("data") || "";
  const parsed = useMemo(() => decodeData(encoded), [encoded]);

  const mbti = parsed?.mbti?.toUpperCase?.();
  const imgSrc = mbti && MBTI_IMAGES[mbti];

  const didTest = sessionStorage.getItem("didTest") === "1";
  const isValid = !!mbti && !!imgSrc;

  const showPresent = didTest && isValid;
  console.log(imgSrc);

  const goStart = () => {
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center bg-white p-6">
      <div>
        <p className="text-[12px] Medium my-8">
          안녕하세요 (꾸벅)🙇🏻‍♀️🦁 <br />
          성결대학교 멋쟁이사자처럼 13기 운영진입니다 !<br />
          테스트에 참여해주셔서 감사드립니다.
          <br />
          <br />
          웹 하단에 동아리페스티벌 &lt;멋쟁이사자처럼 부스&gt; 에서
          <br />
          진행하는 이벤트 참여방법이 있으니 꼬옥!! 참여하세요 &gt;_~
          <br />
          <br />
          (엄청 엄청 간단함 dd) 결과만 보고 가지 말아요 ..
        </p>
      </div>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={mbti}
          className="w-[80%] max-w-[520px] bg-white p-6 rounded-2xl border-2"
        />
      ) : (
        <p className="text-gray-600">해당 MBTI 이미지가 없어요 😅</p>
      )}
      <div className="flex flex-col items-center gap-4 my-8">
        <button className="bg-[#2B2B2B] p-3 w-[190px] rounded-2xl text-white Medium text-[14px]" onClick={goStart}> 
          테스트 다시하기
        </button>
        <button className="bg-[#2B2B2B] p-3 w-[190px] rounded-2xl text-white Medium text-[14px]">
          카카오톡 공유하기
        </button>
        <button className="bg-[#2B2B2B] p-3 w-[190px] rounded-2xl text-white Medium text-[14px]">
          이미지로 저장하기
        </button>
        <button className="bg-[#2B2B2B] p-3 w-[190px] rounded-2xl text-white Medium text-[14px]">
          제작자
        </button>
      </div>
      <div>
        <div className="text-[12px] Medium mt-4 mb-8">
          <p className="text-[15px] pb-7">
            🎉 신데렐라 성격 테스트 이벤트 안내 🎉
          </p>
          📌 테스트 결과를 스크린샷 또는 이미지로 저장하고,
          <br />
          멋쟁이사자처럼 부스에 방문해 주세요!
          <br />
          <br />
          👉 결과를 보여주신 분께는 꽝 없는 돌림판 1회 이용권을 드립니다.
          <br />
          👉 본 이벤트는 테스트 참여자에 한하여 제공됩니다.
          <br />
          <br />
          📍 위치: 운동장 내 멋쟁이사자처럼 부스
          <br />
          많은 참여 부탁드립니다! 💫
        </div>
      </div>
      {showPresent ? (
        <Present />
      ) : (
        <div className="bg-[#1C1C1C] text-white Medium text-[14px] rounded-xl px-10 py-8 mb-4">
          📌 테스트 참여자만 상품 수령이 가능해요.
          <div className="mt-5">
            <button
              onClick={goStart}
              className="bg-[#2E6DFF] p-3 w-[190px] rounded-2xl text-white Medium text-[12px]"
            >
              테스트 하러 가기 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Result;
