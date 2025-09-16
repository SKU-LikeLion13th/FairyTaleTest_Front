import React, { useMemo, useEffect } from "react";
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
  const KAKAO_KEY = "9501dcff2358acfe7aa7871bbe8bbf7d";
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const encoded = params.get("data") || "";
  const parsed = useMemo(() => decodeData(encoded), [encoded]);

  const mbti = parsed?.mbti?.toUpperCase?.();
  const imgSrc = mbti && MBTI_IMAGES[mbti];

  const didTest = sessionStorage.getItem("didTest") === "1";
  const isValid = !!mbti && !!imgSrc;

  const showPresent = didTest && isValid;

  const goStart = () => {
    navigate("/");
  };
  const making = () => {
    navigate("/team");
  };

  //사진 저장 기능
  const handleSaveImage = async () => {
    if (!imgSrc || !mbti) return;
    try {
      const resp = await fetch(imgSrc, { mode: "cors" });
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${mbti}.png`; // 저장 파일명
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      window.open(imgSrc, "_blank");
    }
  };

  //카톡 공유하기
  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js";
      script.async = true;
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_KEY);
        }
      };
      document.head.appendChild(script);
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY);
    }
  }, []);

  const handleKakaoShare = () => {
    if (!window.Kakao) return;

    const absoluteImgUrl = new URL(images.shareImg, window.location.origin)
      .href;

    const shareUrl = window.location.href; // 현재 결과 페이지
    const startUrl = window.location.origin + "/"; // 시작 페이지

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "✨ 나의 신데렐라 MBTI는?",
        description: `${mbti} 타입 신데렐라`,
        imageUrl: absoluteImgUrl,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: "나도 테스트 해보기",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center bg-white">
      <div className="bg-[#C2F2FF] px-6 py-4 text-center w-full mt-10">
        <p className="UhBee text-sm text-gray-600 font-semibold">
          신데렐라 테스트 - 제작 성결대학교 멋쟁이사자처럼 13기
        </p>
      </div>
      <div className="mt-2">
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
        <img src={imgSrc} alt={mbti} className="w-[85%]" />
      ) : (
        <p className="text-gray-600">해당 MBTI 이미지가 없어요 😅</p>
      )}
      <div className="flex flex-col items-center gap-4 my-8">
        <button
          className="bg-[#2B2B2B] p-3 w-[190px] rounded-2xl text-white Medium text-[14px] cursor-pointer"
          onClick={goStart}>
          테스트 다시하기
        </button>
        <button
          className="bg-[#2B2B2B] p-3 w-[190px] rounded-2xl text-white Medium text-[14px] cursor-pointer"
          onClick={handleKakaoShare}>
          카카오톡 공유하기
        </button>
        <button
          className="bg-[#2B2B2B] p-3 w-[190px] rounded-2xl text-white Medium text-[14px] cursor-pointer"
          onClick={handleSaveImage}
          disabled={!imgSrc}>
          이미지로 저장하기
        </button>
        <button
          className="bg-[#2B2B2B] p-3 w-[190px] rounded-2xl text-white Medium text-[14px] cursor-pointer"
          onClick={making}>
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
              className="bg-[#2E6DFF] p-3 w-[190px] rounded-2xl text-white Medium text-[12px] cursor-pointer">
              테스트 하러 가기 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Result;
