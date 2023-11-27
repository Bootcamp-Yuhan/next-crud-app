import type { NextApiRequest, NextApiResponse } from 'next'
import { categoryData } from '../../../../data'

export type CategoryData = {
    id: number
    initial: string
    name: string
    active: boolean
    created_by: string
    created_on: number
    modified_by: string | null
    modified_on: number | null
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { catId } = req.query
    if(req.method === 'GET' && catId != null){
        res.status(200).json(categoryData.filter(data =>data.id == +catId))
    }
}