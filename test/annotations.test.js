const request = require('supertest');
const app = require('../src/app');
const Annotation = require('../src/models/AnnotationData');

beforeEach(async () => {
  await Annotation.deleteMany();
});

afterEach(async () => {
  await Annotation.deleteMany();
});

afterAll(async () => {
  await Annotation.db.close();
});

const annotations = [
  {
    title: 'Contas',
    notes: 'Pagar a conta de luz',
    priority: true,
  },
  {
    title: 'Mercado',
    notes: 'Comprar carne segunda-feira',
    priority: false,
  },
];

test('Deve ser possível adicionar uma nova anotação', async () => {
  const response = await request(app).post('/annotations').send(annotations[0]);

  expect(response.body).toMatchObject({
    ...annotations[0],
  });
});

test('Deve ser possível atualizar dados de uma anotação', async () => {
  const response = await request(app).post('/annotations').send(annotations[1]);
  const updateAnnotation = {
    ...annotations[1],
    notes: 'Comprar frango segunda-feira',
  };

  const responseUpdate = await request(app)
    .post(`/contents/${response.body._id}`)
    .send(updateAnnotation);

  expect(responseUpdate.body).toMatchObject(updateAnnotation);
});

test('Deve ser possível remover uma anotação', async () => {
  const response = await request(app).post('/annotations').send(annotations[0]);

  await request(app).delete(`/annotations/${response.body._id}`).expect(200);
});

test('Deve ser possível listar todas as anotações', async () => {
  const response = await request(app).post('/annotations').send(annotations[0]);

  const responseGet = await request(app).get('/annotations');

  expect(responseGet.body).toHaveLength(1);
});
