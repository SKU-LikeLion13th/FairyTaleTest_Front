import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://calc.sku-sku.com",
});

const Present = () => {
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    if (!value.trim()) {
      alert("값을 입력해 주세요!");
      return;
    }

    try {
      const res = await api.post("/member/add", {
        memberInfo: value,
      });
      alert("제출 완료! 🎉");
      setValue("");
    } catch (err) {
      console.error(err);
      alert("전송 실패 💥 다시 시도해 주세요!");
    }
  };

  const isEmpty = !value.trim();

  return (
    <div className="w-[85%]">
      <div className="bg-[#1C1C1C] w-full py-10 text-white Medium mt-4 mb-8 rounded-2xl">
        <p className="text-[15px] pb-1">🎁 상품 수령 안내 🎁</p>
        <p className="text-[12px] leading-6 mb-4">
          돌림판 상품 수령을 희망하실 경우, <br />
          학과 / 학번 / 이름을 미리 작성해 주세요!
        </p>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="멋사학과/20251313/김멋사"
          className="w-[85%] bg-white placeholder-gray-400 text-black text-center text-[12px] rounded-md p-2 py-3"
        />

        <p className="text-[10px] my-4 leading-4 Light text-[#FF5B5B]">
          ⚠️ 미작성, 정보기입 오류 시 상품 수령이 불가합니다.
          <br />
          동아리페스티벌 종료 후 입력하신 정보는 모두 폐기됩니다.
        </p>

        <button
          onClick={handleSubmit}
          disabled={isEmpty}
          className={`text-[12px] w-[60%] py-3 rounded-xl mt-2 
            ${
              isEmpty
                ? "bg-[#B0B0B0] text-[#585858]"
                : "bg-[#2E6DFF] text-white cursor-pointer"
            }`}>
          제출하기
        </button>
      </div>
    </div>
  );
};

export default Present;
