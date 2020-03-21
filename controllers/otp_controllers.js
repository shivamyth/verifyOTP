const OtpStrategy = require('../config/otp-strategy');

module.exports.generate = async function(req,res){
    try{
        const result = await OtpStrategy.generateOtp(req.query.phoneNumber);
        console.log(result);
        return res.json(200, {
            message:"An OTP has been generated and send it to your mobile phone",
            hash: result.hash,
        });
    }catch(err){
        console.log("Error in generating an otp",err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
};

module.exports.verify = async function(req,res){
    try{
        const phoneNumber = req.query.phoneNumber;
        const otp = req.query.otp;
        const hash = req.query.hash;
        const isVerified = await OtpStrategy.verifyOtp(phoneNumber, otp, hash);
        if(isVerified){
            return res.json(200,{
                message:"Congratulations You are verified!!",
            });
        }else{
            return res.json(200,{
                message:"You have entered an Invalid OTP",
            }); 
        }
    }catch(err){
        console.log("Error in verifying an otp",err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
}