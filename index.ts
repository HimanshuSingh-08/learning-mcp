import { KiteConnect } from "kiteconnect";

const apiKey = "";
const apiSecret = "";
 const requestToken = ""; 
// Per req/token it will get expired after one req


let accessToken = "";

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
    console.log(response.access_token);
    
    console.log("Session generated:", response);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

async function getProfile() {
  try {
    const profile = await kc.placeOrder("regular", {
      exchange :"NSE",
      tradingsymbol:"YESBANK",
      transaction_type:"BUY",
      quantity:1,
      product :"CNC",
      order_type :"MARKET"
    });
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}
// Initialize the API calls
init();