export async function getUser(token) {
  const res = await fetch("http://localhost:8080/user/get_user", {
    method: "GET",
    credentials: "include",
    headers: {
       Cookie: `access_token=${token}`, // envio forzozamente la cookie
       "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  } else {
    return await res.json();
  }
}