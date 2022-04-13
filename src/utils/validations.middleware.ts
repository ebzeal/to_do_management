import { checkSchema } from 'express-validator';

export const createListSchema = checkSchema({
  name: {
    in: 'body',
    isEmpty: {
      negated:true,
      errorMessage: 'name cannot be empty'
    },
    isString: {
      errorMessage: 'name has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'name is too short'
    }
  }
});

export const createItemSchema = checkSchema({
  description: {
    in: 'body',
    isEmpty: {
      negated:true,
      errorMessage: 'description cannot be empty'
    },
    isString: {
      errorMessage: 'description has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'description is too short'
    }
  },

  list_id: {
    in: 'body',
    isEmpty: {
      negated:true,
      errorMessage: 'list_id cannot be empty'
    },
    isLength: {
      options: {
        min: 1
      },
      errorMessage: 'list_id is too short'
    }
  }
});
