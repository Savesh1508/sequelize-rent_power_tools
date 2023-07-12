const errorHandler = async(error, ctx) => {
    ctx.status = 500,
    ctx.body = `Serverda xatolik!\nError: ${error}`;
}

module.exports = {
    errorHandler,
}