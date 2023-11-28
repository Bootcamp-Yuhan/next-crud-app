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
    if (req.method === 'GET') {
        const query = 'SELECT * FROM category';
        const result = await pool.query(
            query
        );
        res.status(200).json(result.rows)
    } else if (req.method === 'POST') {
        const body: CategoryData = req.body;
        let errorMessage: string[] = isCategoryValid(body);
        if (errorMessage.length == 0) {
            const isInitialUnique = await isAddInitialExists(body)
            console.log(isInitialUnique.rows[0].exists)
            if (isInitialUnique.rows[0].exists == true) {
                errorMessage.push("Initial already exists")
            }

            const isNameUnique = await isAddNameExists(body)
            if (isNameUnique.rows[0].exists as boolean == true) {
                errorMessage.push("Name already exists")
            }

            if (errorMessage.length == 0) {
                const created_by = "Admin Insert";
                const created_on = Date.now();

                const query = `INSERT INTO category(initial, name, active, created_by, created_on)
                VALUES ('${body.initial}', '${body.name}', ${body.active}, '${created_by}', (to_timestamp(${created_on} / 1000.0))) returning id`;
                const result = await pool.query(
                    query
                );

                res.status(201).json({ message: `Insert Category Success dengan id : ${result.rows[0].id}` })
            } else {
                res.status(400).json({ message: errorMessage.join(', ') })
            }

        } else {
            res.status(400).json({ message: errorMessage.join(', ') })
        }
    } else if (req.method === 'PUT') {
        const body: CategoryData = req.body
        if (body.id == null) {
            res.status(400).json({ message: 'Error! Edit must include id' })
        } else {
            //latest data
            const query1 = `SELECT * FROM category WHERE id = ${body.id}`;
            const result1 = await pool.query(
                query1
            );
            if (result1.rows.length > 0) {
                const errorMessage: string[] = isCategoryEditValid(body);
                if (errorMessage.length == 0) {
                    const latestData: CategoryData = result1.rows[0];
                    const isInitialUnique = await isEditInitialIsExists(body,latestData)
                    if (isInitialUnique.rows[0].exists == true) {
                        errorMessage.push("Initial already exists")
                    }

                    const isNameUnique = await isEditNameIsExists(body,latestData)
                    if (isNameUnique.rows[0].exists == true) {
                        errorMessage.push("Name already exists")
                    }

                    if(errorMessage.length == 0){
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
                        res.status(200).json({ message: `Edit Category Success id ${result2.rows[0].id}` })
                    } else {
                        res.status(400).json({ message: errorMessage.join(', ') })
                    }

                   
                } else {
                    res.status(400).json({ message: errorMessage.join(', ') })
                }
            } else {
                res.status(400).json({ message: `Error! category with id = ${body.id} not found` })
            }
        }
    } else if (req.method === 'DELETE') {
        const body: CategoryData = req.body
        if (body.id == null) {
            res.status(400).json({ message: 'Error! Delete must include id' })
        } else {
            //latest data
            const query1 = `SELECT * FROM category WHERE id = ${body.id}`;
            const result1 = await pool.query(
                query1
            );
            if (result1.rows.length > 0) {
                const query2 = `DELETE from category
                                 WHERE id = ${body.id} returning id`;
                const result2 = await pool.query(
                    query2
                );
                res.status(204).json({ message: `Delete Category Success id ${result2.rows[0].id}` })
            } else {
                res.status(400).json({ message: `Error! category with id = ${body.id} not found` })
            }
        }

    }
}

function isCategoryValid(body: CategoryData) {
    let errorMessage: string[] = [];
    if (body.name == null) {
        errorMessage.push('name is null')
    } else if (body.name == '') {
        errorMessage.push('name is empty')
    }

    if (body.initial == null) {
        errorMessage.push('initial is null')
    } else if (body.initial == '') {
        errorMessage.push('initial is empty')
    }

    if (body.active == null) {
        errorMessage.push('active is null')
    }
    return errorMessage
}

function isCategoryEditValid(body: CategoryData) {
    let errorMessage: string[] = [];
    if (body.name == '') {
        errorMessage.push('name is empty')
    }

    if (body.initial == '') {
        errorMessage.push('initial is empty')
    }

    return errorMessage
}

async function isAddInitialExists(body: CategoryData) {
    const query = `SELECT EXISTS(SELECT * FROM category WHERE initial = '${body.initial}')`;
    console.log(query);
    return pool.query(query)
}

async function isAddNameExists(body: CategoryData) {
    const query = `SELECT EXISTS(SELECT * FROM category WHERE name = '${body.name}')`;
    return pool.query(query)
}

async function isEditInitialIsExists(body: CategoryData, lastData: CategoryData) {
    const query = `SELECT EXISTS(SELECT * FROM category WHERE initial = '${body.initial}' AND initial != '${lastData.initial}')`;
    return pool.query(query)
}

async function isEditNameIsExists(body: CategoryData, lastData: CategoryData) {
    const query = `SELECT EXISTS(SELECT * FROM category WHERE name = '${body.name}' AND name != '${lastData.name}')`;
    return pool.query(query)
}