import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { decodeData } from "../utils/b64";
import images from "../utils/Images.jsx";

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


const Result = () =>  {
  const [params] = useSearchParams();
  const encoded = params.get("data") || "";
  const parsed = useMemo(() => decodeData(encoded), [encoded]);

  const mbti = parsed?.mbti?.toUpperCase?.();
  const imgSrc = mbti && MBTI_IMAGES[mbti];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#D9F3FE] p-6">
      <h2 className="text-xl mb-3">너의 MBTI는…</h2>
      <p className="text-3xl font-bold mb-6">{mbti || "알 수 없음"}</p>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={mbti}
          className="w-[80%] max-w-[520px] bg-white p-6 rounded-2xl border-2"
        />
      ) : (
        <p className="text-gray-600">해당 MBTI 이미지가 없어요 😅</p>
      )}
    </div>
  );
}
export default Result;