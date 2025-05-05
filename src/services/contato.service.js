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

const deleteContact = async(email) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const {name, telefone, email} = req.body;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "E-mail inválido" });
    }

    try{

        const result = Contato.destroy({
            where: {
                email: email
            }
        });
        if (result === 0) {
            return res.status.json({message: "Nenhum contato encontrado para excluir."});
          } else {
            return res.status.json({message: "Contato excluído com sucesso!"});
          }

    }catch (err){
        return res.status.json({message: "Erro ao deletar o contato! "+err});
    }

}

export default {registerContact}