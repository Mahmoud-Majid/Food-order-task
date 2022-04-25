import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

export default function AvailableMeals() {

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://food-order-f7ea4-default-rtdb.firebaseio.com/meals.json')
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const loadedMeals = [];

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                });
            };
            setMeals(loadedMeals);
            setLoading(false);
        };

        fetchMeals().catch((err) => {
            setLoading(false);
            setError(err.message);
        });
    }, []);


    if (loading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={classes.MealsError}>
                <p>{error}</p>
            </section>
        );
    }

    const mealsList = meals.map(meal =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    );

    return (
        <section className={classes.meals}>
            {!loading && <Card>
                <ul>{mealsList}</ul>
            </Card>}
            {loading && <h1>Loading...</h1>}

        </section>
    )
}
