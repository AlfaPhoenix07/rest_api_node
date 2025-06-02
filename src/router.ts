import {Router} from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProductByID, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

//Routing
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductByID
)

router.post('/', 
    //Validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .custom(value => value > 0).withMessage('El precio no puede ser menor a 0'),
        handleInputErrors,
    createProduct
)

router.put('/:id', 
    //Validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .custom(value => value > 0).withMessage('El precio no puede ser menor a 0'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

router.patch('/:id', updateAvailability)

router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})

export default router