const BASE_URL = "https://linkedin-nrom.onrender.com/api/auth";

export async function signInUser(formData) {
  try {
    console.log("🔹 Signing in with data:", formData);

    const res = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      console.error("❌ Sign-in failed:", res.status, res.statusText);
      throw new Error(`Sign-in failed: ${res.status}`);
    }

    const data = await res.json();
   
    return data;
  } catch (error) {
    console.error("🔥 Error during sign-in:", error);
    return { message: "Network or server error" };
  }
}

export async function signUpUser(formData) {
  try {
    console.log("🔹 Signing up with data:", formData);

    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
        console.log(`${BASE_URL}/signup`);

      console.error("❌ Sign-up failed:", res.status, res.statusText);
      throw new Error(`Sign-up failed: ${res.status}`);
    }

    const data = await res.json();
    
    return data;
  } catch (error) {
    console.error("🔥 Error during sign-up:", error);
    return { message: "Network or server error" };
  }
}
