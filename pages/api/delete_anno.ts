import { deleteAnnotation } from '../../lib/annotations'

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try{
      await deleteAnnotation(req.body.card)
      res.status(200).end()
    }

    catch (error) {
      res.json(error);
      res.status(405).end();
    }
  } 
}
