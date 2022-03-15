import { updateFile } from '../../lib/annotations'

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try{
      await updateFile(req.body.file)
      console.log(req.body.file) //Dit is oke
      res.status(200).end()
    }

    catch (error) {
      res.json(error);
      res.status(405).end();
    }
  } 
}
