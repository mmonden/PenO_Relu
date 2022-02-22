import { delAccount } from "../../../lib/accounts";

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try{
      await delAccount(req.body.account)
      res.status(200).end()
    }

    catch (error) {
      res.json(error);
      res.status(405).end();
    }
  } 
}