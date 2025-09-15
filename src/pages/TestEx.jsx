import React from "react";
import { useNavigate } from "react-router-dom";
import { encodeData } from "../utils/b64";

const TestEx = () => {
  const navigate = useNavigate();

  const goToResult = () => {
    const result = { mbti: "ENFP" }; // 테스트용 고정 결과
    const encoded = encodeData(result);
    navigate(`/result?data=${encoded}`);
  };

  return (
    <div>
      <button
        onClick={goToResult}
        className="bg-[#0073FF] text-white px-6 py-3 rounded-2xl"
      >
        결과로 가기 (ENFP 고정)
      </button>
    </div>
  );
}

export default TestEx;