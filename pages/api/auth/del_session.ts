import { delSession } from "../../../lib/sessions";

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try{
      await delSession(req.body.session)
      res.status(200).end()
    }

    catch (error) {
      res.json(error);
      res.status(405).end();
    }
  } 
}