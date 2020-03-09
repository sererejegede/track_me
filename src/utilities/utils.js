export const getRegionForCoordinates = (points) => {
  console.log('points in utils', points)
  let minX
  let maxX
  let minY
  let maxY

  // init first point
  ((point) => {
    minX = point.latitude
    maxX = point.latitude
    minY = point.longitude
    maxY = point.longitude
  })(points[0])

  // calculate rect
  points.forEach(point => {
    minX = Math.min(minX, point.latitude)
    maxX = Math.max(maxX, point.latitude)
    minY = Math.min(minY, point.longitude)
    maxY = Math.max(maxY, point.longitude)
  })

  const midX = (minX + maxX) / 2
  const midY = (minY + maxY) / 2
  const deltaX = (maxX - minX) + 0.02
  const deltaY = (maxY - minY) + 0.02

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  }
}