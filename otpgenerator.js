// otpGenerator.js

// Function to generate a 4-digit OTP
function generateOTP() {
    // Generate a random number between 1000 and 9999
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
}

const otp = generateOTP();
module.exports = otp;