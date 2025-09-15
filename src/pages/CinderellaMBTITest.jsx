import React, { useState } from "react";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CinderellaMBTITest = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1-12: 질문
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      scene: "무도회 초대장 도착",
      description: "👑 왕궁에서 무도회 초대장이 도착했다!",
      question: "👉 “초대장을 받았을 때, 난 어떻게 반응할까?”",
      options: [
        {
          text: "“와, 무조건 가야지! 오랜만에 사람들이랑 신나게 놀자!”",
          value: "E",
        },
        { text: "“굳이 꼭 가야 하나...? 혼자 푹 쉬고 싶은데.”", value: "I" },
      ],
    },
    {
      id: 2,
      scene: "새 드레스 고민",
      description:
        "👗 요정 대모가 드레스를 선물해줄테니\n 무도회에 다녀오라고 한다.",
      question: "👉 “드레스에 대한 나의 생각은?”",
      options: [
        {
          text: "“오 드레스 퀄리티 미쳤다. 금실 자수가 눈에 띄네.”",
          value: "S",
        },
        {
          text: "“이 드레스를 입으면 다른 사람이 될 거 같은 느낌!”",
          value: "N",
        },
      ],
    },
    {
      id: 3,
      scene: "호박마차 준비",
      description: "🎃 요정 대모가 호박을 마차로 바뀌게 마술을 부렸다!",
      question: "👉 “마차에 오르기 전 나의 생각은?”",
      options: [
        {
          text: "“오 마차가 있어서 가기 편해졌다.\n 돌아오는 시간, 동선 다 점검해야지.”",
          value: "J",
        },
        {
          text: "“호박마차 신기하네! 시간은 여유 있을 거 같은데?\n 일단 얼른 가서 놀자!!”",
          value: "P",
        },
      ],
    },
    {
      id: 4,
      scene: "무도회장 속 시선",
      description: "👠 요정 대모가 선물해준 구두를 보고 누군가 속삭인다…",
      question: "👉 “그때 나의 반응은?”",
      options: [
        { text: "“왜 쳐다보는거지? 구두가 이쁜가?”", value: "T" },
        {
          text: "“구두가 안어울리나? 아니면 이상해 보이나?...\n 괜히 마음이 찌릿해…”",
          value: "F",
        },
      ],
    },
    {
      id: 5,
      scene: "왕자와 함께",
      description: "💃 멋쟁이 왕자님이 춤을 청했다!",
      question: "👉 “모두의 시선이 집중될 때 나의 반응은?”",
      options: [
        { text: "“헐 왕자의 선택을 받다니! 더 신나게 춤추자!”", value: "E" },
        { text: "“시선이 부담스럽지만... 휴 그래도 괜찮아...”", value: "I" },
      ],
    },
    {
      id: 6,
      scene: "대화의 순간",
      description: "🗣️ 춤추며 왕자가 말을 건다.",
      question: "👉 “왕자가 내게 대화를 걸어오는데...",
      options: [
        { text: "“오늘 음식은 어땠나요? 음악은 어떤지?”", value: "S" },
        { text: "“미래에 어떤 나라를 만들고 싶으세요?”", value: "N" },
      ],
    },
    {
      id: 7,
      scene: "시계가 울린다",
      description: "⏰ 마법이 풀리는 자정이 다가온다!",
      question: "👉 “난 어떻게 할까?”",
      options: [
        { text: "“정리하고 바로 나가야 해.”", value: "J" },
        { text: "“흠 뛰어나가면 돼. 5분은 더 놀 수 있을듯”", value: "P" },
      ],
    },
    {
      id: 8,
      scene: "구두가 벗겨지려 한다",
      description: "👡 급히 뛰다 구두가 벗겨진다.",
      question: "👉 “그 순간 내 마음은?”",
      options: [
        {
          text: "“마음이 급해서 구두가 벗겨졌어.\n 주울 시간 없으니 일단 가자”",
          value: "T",
        },
        { text: "“잃어버리면 안 되는데... 특별한 의미가 있는데.”", value: "F" },
      ],
    },
    {
      id: 9,
      scene: "달빛 아래 도망",
      description: "🌙 정원으로 뛰어나가는데 모두가 쳐다본다!",
      question: "👉 “난 어떻게 할까?”",
      options: [
        { text: "“상관없어! 최대한 멋지고 빠르게 퇴장!”", value: "E" },
        {
          text: "“아무도 모르게 조용히...  빨리 사라지고 싶다...”",
          value: "I",
        },
      ],
    },
    {
      id: 10,
      scene: "집으로 돌아와",
      description: "🏠 집에 도착했다.",
      question: "👉 “방금 일을 떠올리며 무슨 생각을 할까?”",
      options: [
        { text: "“구두 어디에 떨어졌는지 기억해야지.”", value: "S" },
        {
          text: "“이 구두를 누군가 찾아주지 않을까?\n 헉 왕자님이 찾아준다면?”",
          value: "N",
        },
      ],
    },
    {
      id: 11,
      scene: "왕자의 방문",
      description: "👑 왕자가 구두를 들고 찾아왔다.",
      question: "👉 “나의 속마음은?”",
      options: [
        { text: "“엇 잃어버린 내 구두...! 왕자님 감사합니다.”", value: "T" },
        {
          text: "“멋쟁이 왕자님...\n 드디어 날 알아봐주는 사람이 나타났구나...”",
          value: "F",
        },
      ],
    },
    {
      id: 12,
      scene: "해피엔딩",
      description: "✨ 왕자가 구두를 신겨주며 고백하려 한다!",
      question: "👉 “그때 난 어떤 마음일까?”",
      options: [
        {
          text: "“구두가 이어준 인연이네.\n 왕자님과 함께할 안정적인 미래가 오는구나.”",
          value: "J",
        },
        {
          text: "“헉 왕자님이 나를 ?!\n 앞으로 어떤 모험이 펼쳐질까? 두근거려~”",
          value: "P",
        },
      ],
    },
  ];

  const handleAnswer = (answer) => {
    const newAnswer = { questionId: currentStep, answer };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentStep < 12) {
      setCurrentStep(currentStep + 1);
    } else {
      // 12문항 완료 시 -> LoadingPage로 이동 + 답변 전달
      navigate("/loading", { state: { answers: updatedAnswers } });
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setAnswers((prev) => prev.slice(0, -1));
    }
  };

  const question = questions[currentStep - 1];
  const progress = (currentStep / 12) * 100;

  return (
    <div className="min-h-screen">
      {/* 헤더 */}
      <div className="bg-[#C2F2FF] px-6 py-4 text-center">
        <p className="UhBee text-sm text-gray-600 font-semibold">
          신데렐라 테스트 - 제작 성결대학교 멋쟁이사자처럼 13기
        </p>
      </div>

      {/* 진행바 */}
      <div className="px-13 py-6">
        <div className="flex items-center justify-between mb-2">
          <button onClick={goBack} disabled={currentStep === 1}>
            <MoveLeft
              className={`w-5 h-5 ${
                currentStep === 1 ? "text-gray-300" : "text-black"
              }`}
            />
          </button>
          <span className="UhBee text-sm font-medium">{currentStep}/12</span>
        </div>
        <div className="w-full bg-[#4B4B4B] rounded-full h-1.5">
          <div
            className="bg-[#00B7FF] h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* 질문 내용 */}
      <div className="px-6 pb-8">
        <div className="text-center mb-8">
          <h2 className="UhBee text-2xl text-[#8F8F8F] mb-6">
            #{currentStep} {question.scene}
          </h2>

          <p className="Title text-sm mb-4 mt-10 whitespace-pre-line">
            {question.description}
          </p>
          <p className="Title text-sm mb-17">{question.question}</p>
        </div>

        {/* 선택지 */}
        <div className="space-y-10">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="w-full px-4 py-8 border shadow-md border-[#00B7FF] rounded-xl text-xs text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
              <p className="Title leading-relaxed whitespace-pre-line">
                {option.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CinderellaMBTITest;
