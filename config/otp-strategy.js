const otpGenerator = require('otp-generator');
const crypto = require('crypto');

const hashAlgorithm = 'md5';
const secret = 'MyEarth@123';

//const generateValidPhoneNumber = (phone) => `${/(\d){10}$/.exec(phone)}`;

module.exports.generateOtp = async function(phone){
    //const phoneNumber = generateValidPhoneNumber(phone);
    const otp = otpGenerator.generate(6,{alphabets:false,specialChars:false,upperCase:false});
    const phoneOtpData = {
        phone,
        otp
    };
    const hash = crypto.createHmac(hashAlgorithm, secret).update(JSON.stringify(phoneOtpData)).digest('hex');
    console.log(phone+"/"+otp+"/");
    return {phone,otp,hash};
}

module.exports.verifyOtp = async function(phone,otp,hash){
    if(!hash){
        console.error();
    }
    //const phoneNumber = generateValidPhoneNumber(phone);
    const phoneOtpData = {
        phone,
        otp
    };
    console.log(phone + "/"+otp+"/");
    const newHash = crypto.createHmac(hashAlgorithm, secret).update(JSON.stringify(phoneOtpData)).digest('hex');
    let isValid = false;
    console.log(newHash);
    if(newHash==hash){
        isValid = true;
    }
    return isValid;
};