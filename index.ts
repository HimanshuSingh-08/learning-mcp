import { KiteConnect } from "kiteconnect";

const apiKey = "q5nkebkca3h1ibj0";
const apiSecret = "yxswl1qw2x3lik3t8aocls4rpsxckvak";
const requestToken = "z8eIwHy0ylFKGk322GnZXy6BHUhS2hPX";

const kc = new KiteConnect({ api_key: apiKey });

console.log(kc.getLoginURL());


async function init() {
  try {
    await generateSession();
    await getProfile();
  } catch (err) {
    console.error(err);
  }
}

async function generateSession() {
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    kc.setAccessToken(response.access_token);
    console.log("Session generated:", response);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

async function getProfile() {
  try {
    const profile = await kc.getProfile();
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}
// Initialize the API calls
init();