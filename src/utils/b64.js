export function encodeData(obj) {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  // 일반 base64
  const b64 = btoa(bin);
  // URL-safe 로 변환 (+ -> -, / -> _, = 제거)
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function addBase64Padding(b64) {
  const padLen = (4 - (b64.length % 4)) % 4;
  return b64 + "=".repeat(padLen);
}

export function decodeData(urlSafeBase64) {
  try {
    // URL-safe 복구
    const b64 = addBase64Padding(
      urlSafeBase64.replace(/-/g, "+").replace(/_/g, "/")
    );
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
}
