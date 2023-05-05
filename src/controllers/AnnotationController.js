const Annotations = require('../models/AnnotationData');

module.exports = {
  async read(req, res) {
    const annotationList = await Annotations.find();
    return res.json(annotationList);
  },
  async create(req, res) {
    const { title, notes, priority } = req.body;

    if (!title || !notes) {
      return res.json({ error: 'Necessário um título/anotação!' });
    }

    const annotationCreated = await Annotations.create({
      title,
      notes,
      priority,
    });

    return res.json(annotationCreated);
  },
  async delete(req, res) {
    const { id } = req.params;

    await Annotations.findByIdAndDelete(id)
      .then(() => {
        return res.json({
          message: `${id} excluído com sucesso!`,
        });
      })
      .catch(() => {
        return res
          .status(400)
          .json({ error: 'Impossível deletar, registro não encontrado!' });
      });
    return res.status(500);
  },
};
