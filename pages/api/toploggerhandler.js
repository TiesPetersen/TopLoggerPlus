import { getAllGyms, getBoulders } from '@/toplogger'


export default async function handler(req, res) {
    try {
        var result;

        // decode request
        const { func, gymId } = req.body

        if (func == 'allGyms') {
            result = await getAllGyms()
        } else if (func == 'boulders') {
            result = await getBoulders(gymId)
        } else {
            throw new Error("Unknown function");
        }
        
        // return result from server-side request response  
        res.status(200).json(result)
    } catch (err) {
        // return error
        res.status(500).json({ error: 'failed to load toplogger data'})
    }
}