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

const deleteContact = async(email, res) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
            return res.status(404).json({message: "Nenhum contato encontrado para excluir."});
          } else {
            return res.status(200).json({message: "Contato excluído com sucesso!"});
          }

    }catch (err){
        return res.status(500).json({message: "Erro ao deletar o contato! "+err});
    }
}

const putContact = async (updateData, id, res) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(updateData.email)) {
        return res.status(400).json({ message: "E-mail inválido" });
    }


    try{
        const [updated] = await Contato.update(updateData, {
            where: {id: id}
        });
    
        if (updated === 0) {
            return res.status(404).json({ message: "Nenhum contato encontrado para atualizar." });
          } else {
            return res.status(200).json({ message: "Contato atualizado com sucesso!" });
          }
    }catch (err){
        return res.status(500).json({message: "Erro ao atualizar contato! "+err})
    }
}

const getContactsByUserId = async (userId, res) => {
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

  const getContactById = async (id, res) => {
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

  const updateContactPartial = async (id, updatedData, res) => {
    try {
      // Busca o contato pelo id
      const contato = await Contato.findOne({
        where: { id: id }
      });
  
      if (!contato) {
        return res.status(404).json({ message: "Contato não encontrado." });
      }
  
      const updatedContato = await contato.update(updatedData);
  
      return res.status(200).json(updatedContato);
  
    } catch (err) {
      return res.status(500).json({ message: "Erro ao atualizar o contato: " + err.message });
    }
  };
  
  
  

export default {registerContact, deleteContact, getContactsByUserId,
     getContactById, updateContactPartial, putContact}