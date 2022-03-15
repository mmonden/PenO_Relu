import { deleteFile } from '../../lib/annotations'

export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            await deleteFile(req.body.file)
            res.status(200).end()
        }

        catch (error) {
            res.json(error);
            res.status(405).end();
        }
    }
}