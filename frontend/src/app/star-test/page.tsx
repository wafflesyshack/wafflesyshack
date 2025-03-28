'use client';

import React, { useState } from 'react';
import TaskForm from '../../../components/TaskForm';
import StarDisplay from '../../../components/StarDisplay';
import { Star } from '../../types/stars';

const Home: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  const handleStarCreated = (newStar: Star) => {
    setStars([...stars, newStar]);
  };

  return (
    <div>
      <TaskForm onStarCreated={handleStarCreated} />
      <StarDisplay stars={stars} />
    </div>
  );
};

export default Home;
