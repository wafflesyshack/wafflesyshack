// import React, { useState, useEffect } from 'react';
// import { Star } from '../types/star';
// import { FaStar } from 'react-icons/fa';

// interface StarIconProps {
//   star: Star;
// }

// const StarIcon: React.FC<StarIconProps> = ({ star }) => {
//   const iconSize = 20;
//   const iconColor = star.star_color;
//   const opacity = star.star_light / 100;

//   return (
//     <FaStar
//       size={iconSize}
//       color={iconColor}
//       style={{
//         position: 'absolute',
//         left: star.star_position_x - iconSize / 2,
//         top: star.star_position_y - iconSize / 2,
//         opacity: opacity,
//       }}
//     />
//   );
// };

// interface StarDisplayProps {
//   stars: Star[];
// }

// const StarDisplay: React.FC<StarDisplayProps> = ({ stars }) => {
//   const [fetchedStars, setFetchedStars] = useState<Star[]>([]);

//   useEffect(() => {
//     const fetchStars = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/stars?achievement_id=1`
//         ); // achievement_id は仮に 1
//         if (response.ok) {
//           const data = await response.json();
//           setFetchedStars(data.stars);
//         } else {
//           console.error('星の取得に失敗しました:', response.statusText);
//         }
//       } catch (error) {
//         console.error('星の取得エラー:', error);
//       }
//     };

//     fetchStars();
//   }, []);

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         pointerEvents: 'none',
//         zIndex: -1,
//       }}
//     >
//       {fetchedStars.map((star) => (
//         <StarIcon key={star.id} star={star} />
//       ))}
//     </div>
//   );
// };

// export default StarDisplay;
