import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    components: {
      schemas: {
        IRecipes: {
          type: 'object',
          properties: {
            count: { type: 'number' },
            from: { type: 'number' },
            hits: { type: 'array', items: { $ref: '#/components/schemas/IRecipe' } },
            nextPage: { type: ['string', 'null'] },
            to: { type: 'number' },
          },
        },
        IRecipe: {
          type: 'object',
          properties: {
            recipe: { $ref: '#/components/schemas/IRecipeDetails' },
            _links: { $ref: '#/components/schemas/ILinks' },
          },
        },
        IRecipeDetails: {
          type: 'object',
          properties: {
            uri: { type: 'string' },
            label: { type: 'string' },
            image: { type: 'string' },
            images: { type: 'array', items: { $ref: '#/components/schemas/IImage' } },
            source: { type: 'string' },
            url: { type: 'string' },
            shareAs: { type: 'string' },
            yield: { type: 'number' },
            dietLabels: { type: 'array', items: { $ref: '#/components/schemas/TDiet' } },
            healthLabels: { type: 'array', items: { type: 'string' } },
            cautions: { type: 'array', items: { type: 'string' } },
            ingredientLines: { type: 'array', items: { type: 'string' } },
            ingredients: { type: 'array', items: { $ref: '#/components/schemas/IIngredient' } },
            calories: { type: 'number' },
            totalWeight: { type: 'number' },
            totalTime: { type: 'number' },
            cuisineType: { type: 'array', items: { $ref: '#/components/schemas/TCuisineType' } },
            mealType: { type: 'array', items: { $ref: '#/components/schemas/TMealType' } },
            dishType: { type: 'array', items: { $ref: '#/components/schemas/TDishType' } },
            totalNutrients: { $ref: '#/components/schemas/INutrients' },
            totalDaily: { $ref: '#/components/schemas/INutrients' },
            digest: { type: 'array', items: { $ref: '#/components/schemas/IDigest' } },
          },
        },
        IImage: {
          type: 'string',
          enum: ['THUMBNAIL', 'SMALL', 'REGULAR', 'LARGE'],
        },
        IImageType: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            width: { type: 'number' },
            height: { type: 'number' },
          },
        },
        IIngredient: {
          type: 'object',
          properties: {
            food: { type: 'string' },
            measure: { type: 'string' },
            foodCategory: { type: 'string' },
            foodId: { type: 'string' },
            image: { type: 'string' },
            quantity: { type: 'number' },
            text: { type: 'string' },
            weight: { type: 'number' },
          },
        },
        INutrients: {
          type: 'object',
          properties: {
            ENERC_KCAL: { $ref: '#/components/schemas/INutrient' },
            FAT: { $ref: '#/components/schemas/INutrient' },
            FASAT: { $ref: '#/components/schemas/INutrient' },
            // ... (include all nutrient properties here)
          },
        },
        INutrient: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            quantity: { type: 'number' },
            unit: { type: 'string' },
          },
        },
        IDigest: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            tag: { type: 'string' },
            schemaOrgTag: { type: 'string' },
            total: { type: 'number' },
            hasRDI: { type: 'boolean' },
            daily: { type: 'number' },
            unit: { type: 'string' },
            sub: { type: 'array', items: { $ref: '#/components/schemas/IDigest' } },
          },
        },
        ILinks: {
          type: 'object',
          properties: {
            self: { $ref: '#/components/schemas/ILink' },
          },
        },
        ILink: {
          type: 'object',
          properties: {
            href: { type: 'string' },
            title: { type: 'string' },
          },
        },
        TRecipeType: {
          type: 'string',
          enum: ['public', 'user', 'any'],
        },
        THealth: {
          type: 'string',
          enum: ['alcohol-cocktail', 'alcohol-free', 'celery-free'],
        },
        TCuisineType: {
          type: 'string',
          enum: [
            'American',
            'Asian',
            'British',
            'Caribbean',
            'Central European',
            'Chinese',
            'Eastern European',
            'French',
            'Indian',
            'Italian',
            'Japanese',
            'Kosher',
            'Mediterranean',
            'Mexican',
            'Middle Eastern',
            'Nordic',
            'South American',
            'Southeastern Asian',
          ],
        },
        TDiet: {
          type: 'string',
          enum: ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'],
        },
        TMealType: {
          type: 'string',
          enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Teatime'],
        },
        TDishType: {
          type: 'string',
          enum: [
            'Biscuit and cookies',
            'Bread',
            'Cereals',
            'Condiments and sauces',
            'Desert',
            'Drinks',
            'Main course',
            'Pancake',
            'Preps',
            'Preserve',
            'Salad',
            'Sandwiches',
            'Side dish',
            'Soup',
            'Starter',
            'Sweets',
          ],
        },
        Nutrients: {
          type: 'string',
          enum: [
            'ENERC_KCAL',
            'FAT',
            'FASAT',
            'FATRN',
            'FAMS',
            'FAPU',
            'CHOCDF',
            'CHOCDF.net',
            'FIBTG',
            'SUGAR',
            'SUGAR.added',
            'SUGAR.alcohol',
            'PROCNT',
            'CHOLE',
            'NA',
            'CA',
            'MG',
            'K',
            'FE',
            'ZN',
            'P',
            'VITA_RAE',
            'VITC',
            'THIA',
            'RIBF',
            'NIA',
            'VITB6A',
            'FOLDFE',
            'FOLFD',
            'FOLAC',
            'VITB12',
            'VITD',
            'TOCPHA',
            'VITK1',
            'WATER',
          ],
        },
        BodyPart: {
          type: 'string',
          enum: [
            'back',
            'cardio',
            'chest',
            'lower arms',
            'lower legs',
            'neck',
            'shoulders',
            'upper arms',
            'upper legs',
            'waist',
          ],
        },
        Target: {
          type: 'string',
          enum: [
            'abductors',
            'abs',
            'adductors',
            'biceps',
            'calves',
            'cardiovascular system',
            'delts',
            'forearms',
            'glutes',
            'hamstrings',
            'lats',
            'levator scapulae',
            'pectorals',
            'quads',
            'serratus anterior',
            'spine',
            'traps',
            'triceps',
            'upper back',
          ],
        },
        Equipment: {
          type: 'string',
          enum: [
            'assisted',
            'band',
            'barbell',
            'body weight',
            'bosu ball',
            'cable',
            'dumbbell',
            'elliptical machine',
            'ez barbell',
            'hammer',
            'kettlebell',
            'leverage machine',
            'medicine ball',
            'olympic barbell',
            'resistance band',
            'roller',
            'rope',
            'skierg machine',
            'sled machine',
            'smith machine',
            'stability ball',
            'stationary bike',
            'stepmill machine',
            'tire',
            'trap bar',
            'upper body ergometer',
            'weighted',
            'wheel roller',
          ],
        },
        IExercise: {
          type: 'object',
          properties: {
            bodyPart: {
              type: 'string',
              enum: [
                'back',
                'cardio',
                'chest',
                'lower arms',
                'lower legs',
                'neck',
                'shoulders',
                'upper arms',
                'upper legs',
                'waist',
              ],
            },
            equipment: {
              type: 'string',
              enum: [
                'assisted',
                'band',
                'barbell',
                'body weight',
                'bosu ball',
                'cable',
                'dumbbell',
                'elliptical machine',
                'ez barbell',
                'hammer',
                'kettlebell',
                'leverage machine',
                'medicine ball',
                'olympic barbell',
                'resistance band',
                'roller',
                'rope',
                'skierg machine',
                'sled machine',
                'smith machine',
                'stability ball',
                'stationary bike',
                'stepmill machine',
                'tire',
                'trap bar',
                'upper body ergometer',
                'weighted',
                'wheel roller',
              ],
            },
            gifUrl: {
              type: 'string',
            },
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            target: {
              type: 'string',
              enum: [
                'abductors',
                'abs',
                'adductors',
                'biceps',
                'calves',
                'cardiovascular system',
                'delts',
                'forearms',
                'glutes',
                'hamstrings',
                'lats',
                'levator scapulae',
                'pectorals',
                'quads',
                'serratus anterior',
                'spine',
                'traps',
                'triceps',
                'upper back',
              ],
            },
            secondaryMuscles: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            instructions: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    info: {
      title: 'Express & Recipes API with Swagger',
      version: '1.0.0',
      description: '',
    },
    basePath: '/',
  },
  servers: [
    {
      url: 'http://localhost:8080', // Update with your server URL
      description: 'Development server',
    },
  ],
  apis: ['./src/routes/recipes/index.ts', './src/routes/exercises/index.ts'],
}

const specs = swaggerJsdoc(options)
export default specs