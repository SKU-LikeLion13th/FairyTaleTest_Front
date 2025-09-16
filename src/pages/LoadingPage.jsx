import React, { useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { encodeData } from "../utils/b64";

export default function LoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state || {};

  console.log("넘어온 답변 데이터:", answers);

  useEffect(() => {
    if (!answers) return;

    const sendMBTIResult = async () => {
      try {
        console.log("전송할 데이터:", answers);

        const response = await axios.post(
          "https://calc.sku-sku.com/mbti/result",
          answers, // 배열 직접 전송
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("응답 데이터:", response.data);

        // MBTI 결과를 객체로 만들기
        const result = { mbti: response.data.mbti }; // 필요하면 점수/설명 더 넣기

        // base64로 인코딩
        const encoded = encodeData(result);

        // URL 파라미터로 navigate
        sessionStorage.setItem("didTest", "1");
        navigate(`/result?data=${encoded}`);
      } catch (error) {
        console.error("API 요청 실패:", error.response?.data || error.message);
        console.error("전체 에러:", error);
      }
    };

    sendMBTIResult();
  }, [answers, navigate]);

  return (
    <div className="min-h-screen flex flex-col pt-10">
      {/* 헤더 */}
      <div className="bg-[#C2F2FF] px-6 py-4 text-center">
        <p className="UhBee text-sm text-gray-600 font-semibold">
          신데렐라 테스트 - 제작 성결대학교 멋쟁이사자처럼 13기
        </p>
      </div>

      {/* 중앙 */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="SemiBold text-lg font-bold">
          나는 어떤 신데렐라일까?
        </div>
        <Lottie animationData={loadingAnimation} style={{ width: 150 }} />
      </div>
    </div>
  );
}
