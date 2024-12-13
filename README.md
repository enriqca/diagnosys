#### Membros:
- Mateus Henrique
- Henrique César

#### Tecnologias
- Front-end: Vue.js
- Back-end: Node.js/Express
- Banco de Dados: MySQL

#### Objetivo do sistema

DiagnoSys é um sistema que buscar facilitar toda a rotina médica de uma consulta, realização de exames e compra de medicamentos. Através de uma plataforma unificada, que visa centralizar as informações dos pacientes, como histórico médico (consultas, exames realizados, medicamentos controlados), o sistema tem o objetivo de fazer com que consultas médicas sejam cada vez mais eficientes, uma vez que os médicos terão todas as informações de cada paciente em um mesmo lugar.

Além disso, o sistema busca facilitar a realização de exames e compra de medicamentos através do gerenciamento de receitas e pedidos de exames resultantes de uma consulta realizada. O acesso a esses documentos através de um documento de identificação do paciente, tem por objetivo a otimização de tempo do paciente e a redução de imprevistos como por exemplo a perda do pedido impresso.

#### Funcionalidades do sistema:

- Agendamento de consultas e exames médicos
  - Cadastro de pedidos de exame
  - Cadastro de consultas
  - Consulta dos registros cadastrados

- Cadastramento de novos pacientes
  - Gerenciamento dos pacientes cadastrados no sistema
  - Cadastro de novos pacientes
  - Consulta do histórico médico de cada paciente

- Gerenciamento de receitas e pedidos de exames médicos
  - Consulta de pedidos e receitas cadastradas para cada paciente

- Armazenamento do histórico médico dos pacientes
  - Listagem de consultas, exames, medicamentos utilizados por cada paciente

### Arquitetura Hexagonal

A arquitetura hexagonal visa isolar o núcleo do sistema (a lógica de negócios) das dependências externas, facilitando a manutenção, os testes e a escalabilidade. Nessa linha de pensamento, faz sentido usar essa arquitetura para desenvolver o sistema, visto que, em primeiro lugar, a implementação do sistema fica mais fácil e, em segundo lugar, vamos precisar realizar uma bateria grande de testes, o que é facilitado utilizando esse tipo de arquitetura.

### Por que o sistema está adotando essa arquitetura?
O Diagnosys adota a arquitetura hexagonal pelos seguintes motivos:

- Manutenção: A separação clara entre o núcleo do sistema e suas dependências externas facilita a manutenção. Mudanças nas interfaces de usuário ou nas tecnologias de armazenamento não afetam a lógica de negócios.
 
- Testes: A arquitetura permite testar o núcleo do sistema de maneira isolada, utilizando mocks para as dependências externas. Isso facilita a criação de testes unitários e de integração.

- Escalabilidade: A arquitetura hexagonal facilita a adição de novas funcionalidades e adaptações a novos requisitos sem a necessidade de reescrever grandes partes do sistema.

- Flexibilidade: A substituição ou atualização das dependências externas pode ser feita com mínimo impacto no núcleo do sistema.

### Domínio e Adaptadores

#### Portas

As portas são interfaces que definem como os adaptadores externos podem interagir com o núcleo do sistema. No Diagnosys, temos:

Repositórios: Interfaces que definem as operações de armazenamento e recuperação de dados, nesse caso usamos o sequelize como porta.

Serviços de Aplicação: Interfaces que expõem funcionalidades do núcleo para os adaptadores externos, como os controladores da web.

#### Adaptadores

Os adaptadores são implementações concretas das interfaces definidas pelas portas. Eles permitem a comunicação com sistemas externos e são divididos em dois tipos:

- Adaptadores de Entrada: Incluem os controladores da web que recebem as solicitações dos usuários e chamam os serviços de aplicação apropriados, como usuarioCOntroller.ts.

- Adaptadores de Saída: Implementam as interfaces dos repositórios utilizando tecnologias externas, como bancos de dados, como usuarioService.ts.