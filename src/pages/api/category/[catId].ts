import type { NextApiRequest, NextApiResponse } from 'next'
import { categoryData } from '../../../../data'
import pool from '@/utils/db'

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { catId } = req.query
    if(req.method === 'GET' && catId != null){
        const query = `SELECT * FROM category WHERE id = ${catId}`;
        const result = await pool.query(
            query
        );
        if(result.rows.length > 0){
            res.status(200).json(result.rows[0])
        } else {
            res.status(404).json({message : `Category id = ${catId} not found`})
        }
    }
}