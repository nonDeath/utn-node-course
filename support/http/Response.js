const responseHandler = (request, response, next) => {
    const payload = {
        request,
        response,
        data: {},
    };
    try {


    } catch (error) {
        console.log(error);
    }

    next(payload);
}

module.exports = responseHandler;
