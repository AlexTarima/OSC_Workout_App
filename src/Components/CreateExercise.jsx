// app cannot write to the .json file while running... that makes it harder

import { useState } from "react";
export const STORAGE_KEY = "local_exercises";

export default function CreateExercise() {
    const [name, setName] = useState("");
    const [bodyPart, setBodyPart] = useState("");
    const [target, setTarget] = useState("");
    const [equipment, setEquipment] = useState("");

    /* From WorkoutList.jsx
    const handleSelect = (exercise) => {
        //dynamically add to frequently used list when selected
        if (!frequentlyUsedIds.includes(exercise.id)) {
            setFrequentlyUsedIds((prev) => [...prev, exercise.id]);
        }
        if (onSelectExercise) {
            onSelectExercise(exercise);
        }
    };*/

    const handleName = (event) => {setName(event.target.value);}
    const handleBody = (event) => {setBodyPart(event.target.value);}
    const handleTarget = (event) => {setTarget(event.target.value);}
    const handleEquipment = (event) => {setEquipment(event.target.value);}

    const handleSubmit= (event) => {
        event.preventDefault();
        if (name.trim().length == 0) {return;} // name is empty string

        let currentExercises = [];
        let storedExercises = localStorage.getItem(STORAGE_KEY); // returns null if empty
        if (storedExercises != null) {currentExercises = JSON.parse(storedExercises);}

        let newExercise = {
            id: Date.now(),
            name: name.trim(),
            bodyPart: bodyPart.trim().toLowerCase(), // no clue what the formatting would be for the real api
            target: target.trim().toLowerCase(),
            equipment: equipment.trim().toLowerCase(),
        };

        currentExercises.push(newExercise);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentExercises));
        setName(""); setBodyPart(""); setTarget(""); setEquipment("");
    }

    return (

        <form onSubmit={handleSubmit}>
            <h2>Create Exercise</h2>
            <input placeholder={"Name"} value={name} onChange={handleName}/>
            <input placeholder={"Body Part"} value={bodyPart} onChange={handleBody}/>
            <input placeholder={"Target"} value={target} onChange={handleTarget}/>
            <input placeholder={"Equipment"} value={equipment} onChange={handleEquipment}/>
            <button type={"submit"}>Submit</button>
        </form>
    )
};