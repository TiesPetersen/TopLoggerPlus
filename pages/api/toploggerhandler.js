import { getAllGyms } from '@/toplogger'


export default async function handler(req, res) {
    try {
        var result;

        // decode request
        const { func } = req.body

        if (func == 'allGyms') {
            result = await getAllGyms()
        }
        
        // return result from server-side request response  
        res.status(200).json(result)
    } catch (err) {
        // return error
        res.status(500).json({ error: 'failed to load toplogger data'})
    }
}