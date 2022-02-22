import { createUser } from "../../../lib/users";

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try{
      await createUser(req.body.user)
      res.status(200).end()
    }

    catch (error) {
      res.json(error);
      res.status(405).end();
    }
  } 
}