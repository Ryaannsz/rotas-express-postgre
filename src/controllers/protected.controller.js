

const getProtected = async (req, res) => {
    return res.status(200).json({message: "Acesso permitido."})
}

export default {getProtected}