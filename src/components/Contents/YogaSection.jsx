import React from 'react'
import '../../css/YogaSectionContainer.css'
import CategoryCard from '../../Cards/CategoryCard'
import yogaCatIcn from '../../media/category/yoga-pose.png'
import SelectYogaCat from './SelectYogaCat'
import {Routes,Route} from 'react-router-dom'
import PlankPose from '../Exercises/YogaPoses/PlankPose'
import BegginerYoga from '../Exercises/BegginerYoga/BeginnerYoga'

const YogaSection = () => {
  return (


    <Routes>
      <Route path='/*' element={<SelectYogaCat/>}/>
      <Route path='/begginer-yoga' element={<BegginerYoga/>} />
      <Route path='/plank-pose' element={<PlankPose/>} />
    </Routes>
  )
}

export default YogaSection