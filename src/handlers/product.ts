import {Request, Response} from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response) => {
    try{
        const products = await Product.findAll({
            order: [
                ['price','DESC']
            ]
        })
        res.json({data: products})
    }catch (error){
        console.log(error)
    }
}

export const getProductByID = async (req, res) => {
    try{
        const {id} = req.params
        const product = await Product.findByPk(id)

        if (!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.json({data: product})
    }catch (error){
        console.log(error)
    }
}

export const createProduct = async (req:Request, res: Response) => {
    try{
        const product = await Product.create(req.body)
        res.status(201).json({data: product})
    }catch (error){
        console.log(error)
    }
}

export const updateProduct = async (req, res) =>{
    const {id} = req.params
        const product = await Product.findByPk(id)

        if (!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        //Actualizar
        await product.update(req.body)
        await product.save()
        res.json({data: product})
}

export const updateAvailability = async (req,res) =>{
    const {id} = req.params
        const product = await Product.findByPk(id)

        if (!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        //Actualizar
        product.availability = !product.dataValues.availability
        await product.save()
        res.json({data: product})
}

export const deleteProduct = async (req,res) =>{
    const {id} = req.params
        const product = await Product.findByPk(id)

        if (!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        await product.destroy()
        res.json({data: 'Producto Eliminado' })
    }