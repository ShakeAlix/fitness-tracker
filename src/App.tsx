import { Route, Routes } from 'react-router-dom'
import { useFitnessData } from './hooks/useFitnessData'
import { HomePage } from './pages/HomePage'
import { BodyPartPage } from './pages/BodyPartPage'

export default function App() {
  const {
    bodyParts,
    exercises,
    addBodyPart,
    renameBodyPart,
    deleteBodyPart,
    addExercise,
    updateExercise,
    deleteExercise,
  } = useFitnessData()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            bodyParts={bodyParts}
            exercises={exercises}
            onAddBodyPart={addBodyPart}
            onDeleteBodyPart={deleteBodyPart}
          />
        }
      />
      <Route
        path="/body-part/:id"
        element={
          <BodyPartPage
            bodyParts={bodyParts}
            exercises={exercises}
            onRename={renameBodyPart}
            onDelete={deleteBodyPart}
            onAddExercise={addExercise}
            onUpdateExercise={updateExercise}
            onDeleteExercise={deleteExercise}
          />
        }
      />
    </Routes>
  )
}
