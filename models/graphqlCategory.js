const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const Category = require('../models/categoryModel'); 

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    _id: { type: GraphQLString },
    nome: { type: GraphQLString },
  }),
});


const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
  
    placeholder: {
      type: GraphQLString,
      resolve: () => 'This is a placeholder for Query',
    },
  },
});


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createCategory: {
      type: CategoryType,
      args: {
        nome: { type: GraphQLString },
      },
      async resolve(parent, args) {
        // Validate the input
        if (!args.nome) throw new Error("Nome é necessário");

     
        const newCategory = new Category({
          nome: args.nome,
        });

        await newCategory.save();
        return newCategory;
      },
    },
  },
});

// Create Schema
module.exports = new GraphQLSchema({
  query: Query,  
  mutation: Mutation,
});
