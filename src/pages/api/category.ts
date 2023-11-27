import type { NextApiRequest, NextApiResponse } from 'next'
import { categoryData } from '../../../data'
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
    if(req.method === 'GET'){
        const query = 'SELECT * FROM category';
        const result = await pool.query(
            query
        );
        res.status(200).json(result.rows)
    } else if(req.method === 'POST'){
        const body : CategoryData = req.body
        if(isCategoryValid(body)){
            const created_by = "Admin Insert";
            const created_on = Date.now();

            const query = `INSERT INTO category(initial, name, active, created_by, created_on)
                VALUES ('${body.initial}', '${body.name}', ${body.active}, '${created_by}', (to_timestamp(${created_on} / 1000.0))) returning id`;
            const result = await pool.query(
                    query
            );

            res.status(201).json({message : `Insert Category Success dengan id : ${result.rows[0].id}`})
        } else{
            res.status(400).json({message : 'Error! Data is not Valid'})
        }
    } else if(req.method === 'PUT'){
        const body : CategoryData = req.body
        if(body.id == null){
            res.status(400).json({message : 'Error! Edit must include id'})
        } else {
            //latest data
            const query1 = `SELECT * FROM category WHERE id = ${body.id}`;
            const result1 = await pool.query(
                query1
            );
            if(result1.rows.length > 0){
                const latestData : CategoryData = result1.rows[0];
                const name = body.name != null ? body.name : latestData.name;
                const initial = body.initial != null ? body.initial : latestData.initial;
                const active = body.active != null ? body.active : latestData.active;
                const modified_by = "Admin Modify";
                const modified_on = Date.now();

                const query2 = `UPDATE category
	                            SET initial='${initial}', name='${name}', active='${active}', modified_by='${modified_by}', modified_on=(to_timestamp(${modified_on} / 1000.0))
	                            WHERE id = ${body.id} returning id`;
                const result2 = await pool.query(
                    query2
                );
                res.status(200).json({message : `Edit Category Success id ${result2.rows[0].id}`})
            } else {
                res.status(400).json({message : `Error! category with id = ${body.id} not found`})
            }
        }
    } else if(req.method === 'DELETE'){
        const body : CategoryData = req.body
        if(body.id == null){
            res.status(400).json({message : 'Error! Delete must include id'})
        }
        res.status(204).json({message : 'Delete Category Success'})
    }
}

function isCategoryValid(body : CategoryData){
    if(body.name == null || body.initial == null || body.active == null){
        return false
    }
    return true
}