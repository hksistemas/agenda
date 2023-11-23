const express = require('express');
const path = require('path');
const Agenda = require('./src/models/Agenda');
const sequelize = require('./src/config/database');
const cors = require('cors'); // Adiciona a biblioteca CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o mecanismo de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Adiciona o middleware CORS
app.use(cors());

sequelize.sync({ force: false }).then(() => {
  // console.log('Banco de dados e tabelas criados com sucesso.');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const todos = await Agenda.findAll();
  res.render('index', { todos });
});

app.post('/add', async (req, res) => {
  const { nome, telefone, email } = req.body;
  console.log(nome, telefone, email); // Adicione essa linha para verificar se os dados estão sendo recebidos corretamente

  const todo = await Agenda.create({ nome, telefone, email });
  res.redirect('/'); // Redireciona para a rota '/'
});

app.get('/edit/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Agenda.findByPk(id);
    res.render('edit', { todo });  // Passa todo como parte do contexto
  } catch (error) {
    console.error('Erro ao buscar dados para edição:', error);
    res.redirect('/');
  }
});


app.post('/update/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, telefone, email } = req.body;
  try {
    await Agenda.update({ nome, telefone, email }, { where: { id } });
    res.redirect('/');
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
    res.redirect('/');
  }
});


app.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Agenda.destroy({ where: { id } });
    res.redirect('/');
  } catch (error) {
    console.error('Erro ao excluir o registro:', error);
    res.redirect('/');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
