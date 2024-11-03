
// import similar from 'string-similarity';

// export const compareStrings = (string1: string, string2: string, treshold = 0.7) => {
//   const degreeOfSimilarity = similar.compareTwoStrings(
//     string1.toLowerCase(), 
//     string2.toLowerCase()
//   );
//   const isSimilar = degreeOfSimilarity >= treshold;
//   return {
//     degreeOfSimilarity,
//     isSimilar,
//   };
// };


export const compareStrings = (string1: string, string2: string, threshold = 0.7) => {
  const words1 = [...string1.toLowerCase().split(' ').sort().filter(word => word.trim() !== '')];
  const words2 = [...string2.toLowerCase().split(' ').sort().filter(word => word.trim() !== '')];

  const words1Set = new Set(words1);
  const words2Set = new Set(words2);

  const largerSet = words1Set.size > words2Set.size ? words1Set : words2Set;
  const smallerSet = words1Set.size > words2Set.size ? words2Set : words1Set;

  let intersectionSize = 0;
  const averageSetSize = (words1Set.size + words2Set.size) / 2;

  for (const word of largerSet) {
    if (smallerSet.has(word)) {
      intersectionSize++;
    };
  };

  const degreeOfSimilarity = intersectionSize / averageSetSize;
  const isSimilar = degreeOfSimilarity >= threshold; 

  return {
    degreeOfSimilarity,
    isSimilar,
  };
};