'use strict';
const Sequelize = require('sequelize');
const moment=require('moment');
module.exports = (sequelize) => {
  class Book extends Sequelize.Model {
      publishedAt(){
          const date=moment(this.createdAt).format('MMMM D, YYYY, h:mma');
          return date;
      }
  }
  Book.init({
    
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
      validate: {
      
        notIn: [['0', 'false']],        
        notEmpty:{
          msg:"please provide a title"
        },
      },
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty:{
          msg:"please provide the author name"
        },
      },
    },
    genre: {
      type: Sequelize.STRING,
      defaultValue: false,
    },
    year: {
      type: Sequelize.INTEGER,
      defaultValue: false,
      validate: {
        min: { 
          args:1700,
            msg:"please provide a year that is greater than 1700"
        },
      },
    },
  
    
    }, { 
       timestamps: true,
        sequelize
         }); 
    

  return Book;
};