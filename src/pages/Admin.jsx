import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://calc.sku-sku.com",
});

const safeParse = (s) => {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
};

// memberInfo 값만 추출하는 함수
const extractMemberInfo = (item) => {
  if (typeof item === "string") {
    let s = item.trim();

    if (
      (s.startsWith('"') && s.endsWith('"')) ||
      (s.startsWith("'") && s.endsWith("'"))
    ) {
      s = s.slice(1, -1);
    }

    s = s
      .replace(/\\r/g, "\r")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");

    const looksLikeJson = s.trim().startsWith("{") && s.trim().endsWith("}");
    if (looksLikeJson) {
      const parsedOnce = safeParse(s);
      if (parsedOnce) return extractMemberInfo(parsedOnce);
    }

    for (let i = 0; i < 3; i++) {
      const parsed = safeParse(s);
      if (!parsed) break;

      if (typeof parsed === "string") {
        s = parsed.trim();
        continue;
      }

      if (typeof parsed === "object" && parsed) {
        if (parsed.memberInfo != null) return String(parsed.memberInfo).trim();
        if (typeof parsed.data === "string")
          return extractMemberInfo(parsed.data);
        if (typeof parsed.payload === "string")
          return extractMemberInfo(parsed.payload);
        break;
      }
      break;
    }

    const m1 = s.match(/"memberInfo"\s*:\s*"([^"]*)"/);
    const m2 = s.match(/'memberInfo'\s*:\s*'([^']*)'/);
    if (m1) return m1[1].trim();
    if (m2) return m2[1].trim();

    return s.includes("{") ? "" : s;
  }

  if (item && typeof item === "object") {
    if (item.memberInfo != null) return extractMemberInfo(item.memberInfo);
    if (typeof item.data === "string") return extractMemberInfo(item.data);
    if (typeof item.payload === "string")
      return extractMemberInfo(item.payload);
  }

  return "";
};

const Admin = () => {
  const [members, setMembers] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const { data } = await api.get("/member/all");
        const list = Array.isArray(data) ? data : [];
        const normalized = list.map((raw) => {
          const name = extractMemberInfo(raw?.memberInfo ?? raw); 
          return {
            id: String(raw.id),
            name,
            checked: !!raw?.isCheck, 
          };
        });

        setMembers(normalized);
      } catch (e) {
        console.error(e);

        setErr("멤버 목록을 가져오는 데 실패했어요.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const key = q.trim().toLowerCase();

    if (!key) return members;

    return members.filter((m) => (m.name || "").toLowerCase().includes(key));
  }, [q, members]);

  const toggleCheck = async (id, next) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, checked: next } : m))
    );

    try {
      await api.put(`/member/check/${id}`);
    } catch (e) {
      console.error(e);

      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, checked: !next } : m))
      );

      alert("업데이트에 실패했어요. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 Medium">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">관리자 페이지</h1>

        <span className="text-sm text-gray-500">
          조회: <span className="font-medium">{filtered.length}</span>명
        </span>
      </div>

      <div className="mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="학과/학번/이름 검색 (부분일치)"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none ring-0 placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      {err && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {err}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-500">
          불러오는 중… ⏳
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="min-w-full table-fixed divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-14 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  #
                </th>

                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  학과/학번/이름
                </th>

                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  ID
                </th>

                <th className="w-28 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  수령
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.map((m, idx) => (
                <tr key={m.id} className="hover:bg-orange-50/40">
                  <td className="px-3 py-3 text-sm text-gray-600">{idx + 1}</td>

                  <td className="px-3 py-3 text-sm font-medium text-gray-900">
                    {m.name}
                  </td>

                  <td className="px-3 py-3 font-mono text-xs text-gray-700 break-all">
                    {m.id}
                  </td>

                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={m.checked}
                      onChange={(e) => toggleCheck(m.id, e.target.checked)}
                      className="h-4 w-4 cursor-pointer accent-orange-500"
                    />
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-3 text-center text-sm text-gray-400"
                  >
                    결과가 없어요 🙃
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
