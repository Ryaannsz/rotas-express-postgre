import mongoose from 'mongoose';




mongoose.connect(process.env.MONGOURI, {

  dbName: "fullstack"
}).then(() => console.log("conectado!!!!!!"))
.catch((error) => console.log("deu erro: "+error));


mongoose.connection
  .once('open', () => {
    console.log('Conexão com o MongoDB bem-sucedida!');
  })
  .on('error', (error) => {
    console.error('Erro na conexão com o MongoDB:', error);
  });
