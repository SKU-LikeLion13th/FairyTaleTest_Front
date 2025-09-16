import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import images from "../utils/Images";

export default function Team() {
  const navigate = useNavigate(); // ✅ 훅 사용

  const teamMembers = [
    {
      id: 1,
      name: "대표 한민규",
      role: "백엔드 개발",
      department: "컴퓨터공학과 21학번",
      image: `${images.한민규}`,
    },
    {
      id: 2,
      name: "부대표 신민서",
      role: "프론트엔드 개발",
      department: "미디어소프트웨어학과 22학번",
      image: `${images.신민서}`,
    },
    {
      id: 3,
      name: "파트장 서민주",
      role: "UX/UI 기획 및 디자인",
      department: "관광학과 22학번",
      image: `${images.서민주}`,
    },
    {
      id: 4,
      name: "운영진 노주희",
      role: "백엔드 개발",
      department: "미디어소프트웨어학과 22학번",
      image: `${images.노주희}`,
    },
    {
      id: 5,
      name: "운영진 구혜원",
      role: "프론트엔드 개발",
      department: "미디어소프트웨어학과 22학번",
      image: `${images.구혜원}`,
    },
  ];

  return (
    <div className="min-h-screen pt-10 px-6 bg-[#D9F3FE]">
      <button onClick={() => navigate("/")} className="cursor-pointer">
        <FaArrowLeftLong size={25} />
      </button>

      <div className="text-center">
        <p className="UhBee text-xl mt-5 mb-10">제작에 참여한 사람들</p>
        <p className="Medium text-xs mb-10">성결대학교 멋쟁이사자처럼 13기</p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto Regular">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#D9D9D9] rounded-lg py-1 flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center mt-1 mb-2.5">
              <img src={member.image} alt={member.name} className="w-16 h-16" />
            </div>

            <div>
              <p className="Light text-[6.5px]">{member.department}</p>
              <p className="font-semibold text-[10px]">{member.name}</p>
              <div className="w-16 h-[0.6px] bg-[#1880FF] mx-auto my-2"></div>
              <p className="text-[8.5px] pb-2">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
