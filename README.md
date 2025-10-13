# 🧱 LEGO E-Commerce – Projeto Educacional

Um e-commerce temático inspirado no universo **LEGO**, desenvolvido para fins **educacionais**.  
O projeto tem como objetivo aplicar conceitos de **desenvolvimento full-stack**, **banco de dados relacional**, **integração com APIs externas** e **experiência de usuário gamificada**.

---

## 🚀 Funcionalidades Principais

| Categoria | Descrição |
|------------|------------|
| 🛒 **Compras e Carrinho** | Adicionar produtos ao carrinho, salvar no banco, aplicar cupons, e calcular frete. |
| 💳 **Pagamentos** | Simulação de pagamentos usando APIs gratuitas e integração com sistemas de envio. |
| 📦 **Entregas e Rastreamento** | Cálculo de frete via **API dos Correios** e controle de status de envio (enviado, entregue, etc.). |
| ⭐ **Reviews Autênticos** | Somente usuários que compraram podem avaliar produtos. |
| 🎮 **Gamificação LEGO** | Usuários ganham “Pontos LEGO” por compras, avaliações e interações. |
| 🧑‍💻 **Autenticação** | Login via **Google**, **GitHub** ou **Email/Senha**. Simulação de confirmação por email. |
| 🌗 **Interface Dinâmica** | Dark/Light mode, animações suaves e efeitos de blocos LEGO se encaixando. |
| 🔍 **Filtros Avançados** | Filtros por cor, preço, tema (City, Star Wars, Technic, etc.). |
| 🧩 **Perfil Personalizado** | Avatar LEGO customizado, histórico de pedidos e wishlist. |
| 🧠 **Painel Administrativo** | Gerenciamento de produtos, categorias, usuários e pedidos. |
| 🧭 **Extras Criativos** | Mini-jogo na página 404, modo “montagem inspiracional”, produtos em destaque, promoções e sistema de cupons. |

---

## 🗃️ Modelagem do Banco de Dados

O banco segue o modelo **relacional normalizado (3FN)**, garantindo integridade e escalabilidade.  
As principais tabelas são:

- **Users** – dados de autenticação e perfil.  
- **Products**, **Category**, **Image**, **Stock** – estrutura de catálogo.  
- **Carts** e **Cart_Items** – gerenciamento do carrinho.  
- **Sales**, **Sale_Items**, **Payments**, **Shipments** – todo o fluxo de pedido.  
- **Coupon** – cupons e descontos simulados.  
- **Reviews** – avaliações de usuários autenticados.  
- **User_Points** – sistema de pontuação LEGO.  
- **Logs** – auditoria e rastreamento de ações administrativas.

🧠 *A modelagem foi feita com foco em clareza e performance, utilizando relacionamentos 1:N e N:N quando necessário.*

---

## 🧩 Tecnologias Utilizadas

### **Frontend**
- React + Vite / Next.js  
- TailwindCSS + ShadCN/UI  
- Framer Motion (animações suaves)  
- Axios (requisições HTTP)
- LocalStorage (carrinho offline e tema)

### **Backend**
- Node.js + Express  
- PostgreSQL / MySQL  
- JWT para autenticação  
- Bcrypt para criptografia de senhas  
- Nodemailer (simulação de emails)  
- APIs externas:
  - **Correios** (frete)
  - **Google Auth** (login)
  - **Fake Store / Stripe sandbox** (pagamento simulado)

---

## ⚙️ Estrutura do Projeto

```
📦 lego-ecommerce/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── config/
│   │   └── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── assets/
│   │   └── styles/
│   └── main.jsx
│
└── database/
    └── diagram.png
```

---

## 🧰 Instalação e Uso

### 🔹 Clonar o repositório:
```bash
git clone https://github.com/usuario/lego-ecommerce.git
cd lego-ecommerce
```

### 🔹 Backend:
```bash
cd backend
npm install
npm run dev
```

### 🔹 Frontend:
```bash
cd frontend
npm install
npm run dev
```

---

## 💾 Configuração do Banco de Dados
Crie um arquivo `.env` no diretório do backend com:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=senha
DB_NAME=lego_ecommerce
JWT_SECRET=segredo_super_secreto
```

E rode as migrations (ou use o script SQL gerado pelo diagrama).

---

## 🧑‍🎨 Design & Estilo

- Interface inspirada no site oficial da **LEGO®**, mas **sem uso comercial da marca** (uso educacional apenas).  
- Cores, ícones e animações LEGO-friendly para uma experiência lúdica.  
- Tema Dark/Light, com suporte responsivo para mobile e desktop.

---

## ⚠️ Aviso Legal

> Este projeto **não é afiliado, patrocinado nem licenciado pela LEGO Group**.  
> O uso do nome, imagens e temas LEGO é **somente para fins educacionais e de aprendizado**.

---

## 👷 Autores

**Bryan Prinz** – Desenvolvedor full-stack e criador do projeto.  
💡 Foco: desenvolvimento educacional e integração de tecnologias web modernas.

---

## 🌟 Ideias Futuras

- Implementar um **recomendador inteligente** (“Você pode gostar de...”)
- Criar sistema de **missões diárias** com recompensas LEGO Points.
- Adicionar suporte para **internacionalização (i18n)**.
- Dashboard administrativo com **gráficos e métricas** (usando Recharts).
- Integração com **API de moedas** para preços em USD/EUR.
