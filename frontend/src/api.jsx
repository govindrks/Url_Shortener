// Small API helper - adapt to your backend
export async function createShortLink(target) {
  const res = await fetch("http://localhost:5555", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalUrl:target })
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json?.message || "Network error");
  }
  return res.json();
}
