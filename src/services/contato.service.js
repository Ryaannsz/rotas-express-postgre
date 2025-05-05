import Contato from "../models/Contato";

const registerContact = async (req, res) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const {name, telefone, email} = req.body;

    const existingContact = await Contato.findOne({ where: {email} });

    if (existingContact) {
        return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "E-mail inválido" });
    }

    try{
        const createContact = await Contato.create({
            name,
            password,
            telefone
        });
        return res.status.json({message: "Contato criado com sucesso!", contact: createContact})
    }catch (err){
        return res.status.json({message: "Erro ao criar o contato."})
    }
}

const deleteContact = async(req, res) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const {name, telefone, email} = req.body;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "E-mail inválido" });
    }

    try{

    }catch (err){
        return res.status.json({message: "Erro ao deletar o contato! "+err});
    }

}

export default {registerContact}