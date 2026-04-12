"use server";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;
  const apiKey = process.env.KIT_API_KEY;

  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email address" };
  }

  if (!apiKey) {
    console.error("KIT_API_KEY is not defined in environment variables");
    return { success: false, error: "Configuration error" };
  }

  try {
    // Kit API v4 endpoint for creating/updating a subscriber
    const response = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify({
        email_address: email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Kit API error:", data);
      return { 
        success: false, 
        error: data.errors?.[0]?.message || "Failed to subscribe. Please try again later." 
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
