import Contato from "../models/Contato.js";

const registerContact = async (req, res) => {

    const userId = req.userId;
 

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
            email,
            telefone,
            userId
        });
        return res.status(201).json({message: "Contato criado com sucesso!", contact: createContact})
    }catch (err){
        return res.status(500).json({message: "Erro ao criar o contato."})
    }
}

const deleteContact = async (req, res) => {

  const id = req.params.id;

    try{

        const result = await Contato.destroy({
            where: {
                id: id
            }
        });
        if (result === 0) {
            return res.status(404).json({message: "Nenhum contato encontrado para excluir."});
          } else {
            return res.status(200).json({message: "Contato excluído com sucesso!"});
          }

    }catch (err){
        return res.status(500).json({message: "Erro ao deletar o contato! "+err});
    }
}

const putContact = async (req, res) => {
    const id = req.params.id;
    const { name, email, telefone } = req.body;

    // Verifica se todos os campos foram enviados
    if (!name || !email || !telefone) {
        return res.status(400).json({ message: "Todos os campos (name, email, telefone) são obrigatórios para PUT." });
    }

    try {
        const contato = await Contato.findByPk(id);
        if (!contato) {
            return res.status(404).json({ message: "Contato não encontrado." });
        }

        await Contato.update(
            { name, email, telefone },
            { where: { id } }
        );

        return res.status(200).json({ message: "Contato atualizado com sucesso!" });

    } catch (err) {
        return res.status(500).json({ message: "Erro ao atualizar contato! " + err.message });
    }
};

const getContactsByUserId = async (req, res) => {
  const userId = req.userId;
    try {
      const contatos = await Contato.findAll({
        where: { userId: userId },
      });
  
      if (contatos.length === 0) {
        return res.status(404).json({ message: "Nenhum contato encontrado para este usuário." });
      }
  
      return res.status(200).json(contatos);
    } catch (err) {
      
      return res.status(500).json({ message: "Erro ao buscar contatos: " + err.message });
    }
  }

  const getContactById = async (req, res) => {
  
    const id = req.params.id;
    try {
      const contato = await Contato.findOne({
        where: { id: id }
      });
  
      if (!contato) {
        return res.status(404).json({ message: "Contato não encontrado." });
      }
  
      return res.status(200).json(contato);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao buscar o contato: " + err.message });
    }
  }

  const updateContactPartial = async (req, res) => {
  
    const id = req.params.id;
    const updateData = req.body;

    try {
      const contato = await Contato.findOne({
        where: { id: id }
      });
  
      if (!contato) {
        return res.status(404).json({ message: "Contato não encontrado." });
      }
  
      const updatedContato = await contato.update(updateData);
  
      return res.status(200).json(updatedContato);
  
    } catch (err) {
      return res.status(500).json({ message: "Erro ao atualizar o contato: " + err.message });
    }
  };
  
  
  

export default {registerContact, deleteContact, getContactsByUserId,
     getContactById, updateContactPartial, putContact}