import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AmericanCuisine = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRecipeIndex, setExpandedRecipeIndex] = useState(null); // State to track which recipe is expanded

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/american-cuisine');
        setRecipes(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const toggleRecipeDetails = (index) => {
    setExpandedRecipeIndex(expandedRecipeIndex === index ? null : index);
  };

  if (error) return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  if (recipes.length === 0) return <p className="text-gray-500 text-center mt-4">Loading...</p>;

  return (
    <div className="bg-yellow-50 min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-yellow-600">American Cuisine Recipes</h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div
              className="cursor-pointer p-6"
              onClick={() => toggleRecipeDetails(index)}
            >
              <motion.h2
                className="text-2xl font-semibold mb-4 text-center text-yellow-600 hover:text-yellow-800 transition-colors"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {recipe.name}
              </motion.h2>
              {expandedRecipeIndex === index && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mt-4">Ingredients:</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {Array.isArray(recipe.ingredients) ? (
                      recipe.ingredients.map((item, i) => (
                        <li key={i} className="mb-2">{item}</li>
                      ))
                    ) : (
                      Object.entries(recipe.ingredients).map(([key, value], i) => (
                        <li key={i} className="mb-2">
                          <strong>{key}: </strong>
                          {Array.isArray(value) ? value.join(', ') : value}
                        </li>
                      ))
                    )}
                  </ul>
                  <h3 className="text-xl font-semibold mt-4">Instructions:</h3>
                  <ol className="list-decimal pl-5 mb-4">
                    {recipe.instructions.map((step, i) => (
                      <li key={i} className="mb-2">{step}</li>
                    ))}
                  </ol>
                  <h3 className="text-xl font-semibold mt-4">Tips:</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {recipe.tips.map((tip, i) => (
                      <li key={i} className="mb-2">{tip}</li>
                    ))}
                  </ul>
                  <h3 className="text-xl font-semibold mt-4">Variations:</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {recipe.variations.map((variation, i) => (
                      <li key={i} className="mb-2">{variation}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AmericanCuisine;
