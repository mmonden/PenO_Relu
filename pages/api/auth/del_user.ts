import { delUser } from "../../../lib/users";

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try{
      await delUser(req.body.user)
      res.status(200).end()
    }

    catch (error) {
      res.json(error);
      res.status(405).end();
    }
  } 
}