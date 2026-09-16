export default function successRes(res, statusCode=200, message="Success" ,data=null,) {
    const resbody = {
        success: true,
        status: "success",
        message
    }

    if (data)
        resbody.data = data;
    return res.status(statusCode).json(resbody);
}