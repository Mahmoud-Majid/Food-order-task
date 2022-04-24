import React from 'react'
import Header from '../Layout/Header'
import AvailableMeals from './AvailableMeals'
import MealsSummary from './MealsSummary'


export default function Meals() {
    return (
        <>
            <MealsSummary />
            <AvailableMeals />
        </>
    )
}
