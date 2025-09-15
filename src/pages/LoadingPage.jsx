import React, { useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state || {};

  console.log("넘어온 답변 데이터:", answers);

  useEffect(() => {
    if (!answers) return;

    const sendMBTIResult = async () => {
      try {
        const response = await axios.post(
          "https://calc.sku-sku.com/mbti/result",
          { answers }
        );
        console.log("응답 데이터:", response.data);

        // navigate("/mbti/final", { state: { result: response.data } });
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };

    sendMBTIResult();
  }, [answers, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
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
